use actix_web::dev::HttpServiceFactory;
use actix_web::http::header::ContentType;
use actix_web::middleware::NormalizePath;
use actix_web::web::{self, Data, Path, Query};
use actix_web::{get, FromRequest, HttpRequest, HttpResponse, Scope};
use minijinja::{context, path_loader, Environment};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

use crate::models::{AppErr, ListInput};
use crate::utils::simurgh_request;

type Response = Result<HttpResponse, AppErr>;

#[get("/")]
async fn home(env: Data<Environment<'static>>) -> Response {
    let result = env.get_template("home.html")?.render(())?;
    Ok(HttpResponse::Ok().content_type(ContentType::html()).body(result))
}

#[get("/blogs")]
async fn blogs(rq: HttpRequest, env: Data<Environment<'static>>) -> Response {
    let mut page = 0;

    if let Ok(q) = Query::<ListInput>::extract(&rq).await {
        page = q.page;
    }

    let result = simurgh_request(&format!("/blogs-ssr/?page={page}")).await;
    let result = String::from_utf8(result?.body().await?.to_vec())?;

    let result = env.get_template("blogs.html")?.render(context! {
        blogs_body => result
    })?;
    Ok(HttpResponse::Ok().content_type(ContentType::html()).body(result))
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
enum BlogStatus {
    Draft,
    Published,
}

#[derive(Debug, Deserialize, Serialize)]
struct Blog {
    id: i64,
    slug: String,
    status: BlogStatus,
    author: Option<i64>,
    project: Option<i64>,
    category: Option<i64>,
    created_at: i64,
    updated_at: i64,
    title: String,
    detail: String,
    html: String,
    data: serde_json::Value,
    read_time: i64,
    thumbnail: Option<String>,
}

#[derive(Debug, Deserialize)]
struct BlogSSRR {
    blog: Blog,
    html: String,
}

#[get("/blogs/{slug}")]
async fn blog(
    path: Path<(String,)>, env: Data<Environment<'static>>,
) -> Response {
    let result = simurgh_request(&format!("/blogs-ssr/{}/", path.0)).await;
    let result = result?.json::<BlogSSRR>().await?;

    let result = env.get_template("blog.html")?.render(context! {
        blog_body => result.html,
        blog => result.blog,
    })?;
    Ok(HttpResponse::Ok().content_type(ContentType::html()).body(result))
}

#[get("/robots.txt")]
async fn robots() -> HttpResponse {
    HttpResponse::Ok().content_type(ContentType::plaintext()).body(
        r###"User-agent: *
Disallow: /admin/

User-agent: *
Allow: /

Sitemap: https://gooje.site/sitemap.xml
"###,
    )
}

pub async fn not_found(env: Data<Environment<'static>>) -> Response {
    let result = env.get_template("404.html")?.render(())?;
    Ok(HttpResponse::NotFound().content_type(ContentType::html()).body(result))
}

pub fn router() -> impl HttpServiceFactory {
    let tmpl_path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("templates");
    let mut tmpl_env = Environment::new();
    tmpl_env.set_loader(path_loader(tmpl_path));

    Scope::new("")
        .wrap(NormalizePath::trim())
        .app_data(Data::new(tmpl_env))
        .service(home)
        .service(blogs)
        .service(blog)
        .service(robots)
        .service(web::resource("/404/").get(not_found))
        .service(super::sitemap::router())
}

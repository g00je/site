use crate::models::AppErr;
use crate::utils;
use actix_web::dev::{ConnectionInfo, HttpServiceFactory};
use actix_web::http::header::ContentType;
use actix_web::middleware::NormalizePath;
use actix_web::{get, HttpResponse, Scope};
use cercis::prelude::*;

#[get("/sitemap-web.xml")]
async fn web(conn: ConnectionInfo) -> HttpResponse {
    let host = format!("{}://{}", conn.scheme(), conn.host());
    let result = rsx! {
        urlset {
            xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
            url {
                loc {"{host}/"}
                lastmod { "2024-10-03" }
            }
        }
    }
    .render();

    HttpResponse::Ok()
        .content_type(ContentType::xml())
        .body(r#"<?xml version="1.0" encoding="UTF-8"?>"#.to_string() + &result)
}

#[get("/sitemap-blogs.xml")]
async fn blogs(conn: ConnectionInfo) -> HttpResponse {
    let base_url = format!("{}://{}/blogs", conn.scheme(), conn.host());

    let url = format!("/blogs-sitemap/?base_url={base_url}");

    let result: Result<String, AppErr> = async move {
        let result = utils::simurgh_request(&url).await;
        Ok(String::from_utf8(result?.body().await?.to_vec())?)
    }
    .await;

    HttpResponse::Ok()
        .content_type(ContentType::xml())
        .body(result.unwrap_or_default())
}

#[get("/sitemap.xml")]
async fn index(conn: ConnectionInfo) -> HttpResponse {
    let host = format!("{}://{}", conn.scheme(), conn.host());
    let result = rsx! {
        sitemapindex {
            xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
            sitemap { loc { "{host}/sitemap-web.xml/" } }
            sitemap { loc { "{host}/sitemap-blogs.xml/" } }
        }
    }
    .render();

    HttpResponse::Ok()
        .content_type(ContentType::xml())
        .body(r#"<?xml version="1.0" encoding="UTF-8"?>"#.to_string() + &result)
}

pub fn router() -> impl HttpServiceFactory {
    Scope::new("")
        .wrap(NormalizePath::trim())
        .service(index)
        .service(web)
        .service(blogs)
}

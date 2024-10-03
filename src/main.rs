use actix_files as af;
use actix_web::{
    get, middleware,
    web::{Data, Path, Redirect, ServiceConfig},
    App, HttpServer,
};
use config::config;

mod config;
mod models;
mod sitemap;
mod utils;
mod web;

pub struct AppState {}

#[get("/simurgh-record/{path:.*}")]
async fn redirect_simrugh_record(path: Path<(String,)>) -> Redirect {
    Redirect::to(format!("{}/simurgh-record/{}", config().simurgh_host, path.0))
        .permanent()
}

#[get("/simurgh-ssrs/{path:.*}")]
async fn redirect_simrugh_ssrs(path: Path<(String,)>) -> Redirect {
    Redirect::to(format!("{}/simurgh-ssrs/{}", config().simurgh_host, path.0))
        .permanent()
}

fn config_app(app: &mut ServiceConfig) {
    if cfg!(debug_assertions) {
        app.service(af::Files::new("/static", "static"));
        app.service(redirect_simrugh_record);
        app.service(redirect_simrugh_ssrs);
    }

    app.service(web::router());
}

#[cfg(unix)]
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::from_path(".env").expect("could not read .env file");
    pretty_env_logger::init();

    let data = Data::new(AppState {});
    let server = HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::new("%s %r %Ts"))
            .app_data(data.clone())
            .configure(config_app)
    });

    let server = if cfg!(debug_assertions) {
        server.bind(("127.0.0.1", 7000)).unwrap()
    } else {
        use std::os::unix::fs::PermissionsExt;
        const PATH: &'static str = "/usr/share/nginx/socks/g00je.site.sock";
        let server = server.bind_uds(PATH).unwrap();
        std::fs::set_permissions(PATH, std::fs::Permissions::from_mode(0o777))?;
        server
    };

    server.run().await
}

#[cfg(windows)]
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::from_path(".env").expect("could not read .env file");
    pretty_env_logger::init();

    let data = Data::new(AppState {});

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::new("%s %r %Ts"))
            .app_data(data.clone())
            .configure(config_app)
    })
    .bind(("127.0.0.1", 7000))
    .expect("server bind")
    .run()
    .await
}

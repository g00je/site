use std::sync::OnceLock;

#[derive(Debug)]
/// Main Config
pub struct Config {
    pub simurgh_project: i64,
    pub simurgh_host: String,
    pub simurgh_auth: String,
    pub heimdall_token: String,
}

impl Config {}

macro_rules! evar {
    ($name:literal) => {
        std::env::var($name).expect(concat!($name, " was not found in env"))
    };
}

pub fn config() -> &'static Config {
    static STATE: OnceLock<Config> = OnceLock::new();

    let simurgh_project = evar!("SIMURGH_PROJECT")
        .parse::<i64>()
        .expect("SIMURGH_PROJECT is not i64");
    let simurgh_host = if cfg!(debug_assertions) {
        "http://localhost:7700"
    } else {
        "https://simurgh.00-team.org"
    }
    .to_string();

    STATE.get_or_init(|| Config {
        simurgh_auth: format!(
            "project {simurgh_project}:{}",
            evar!("SIMURGH_API_KEY")
        ),
        simurgh_project,
        simurgh_host,
        heimdall_token: evar!("HEIMDALL_TOKEN"),
    })
}

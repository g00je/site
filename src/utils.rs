use crate::config::{config, Config};
use crate::models::AppErr;
use actix_http::encoding::Decoder;
use actix_http::Payload;
use awc::ClientResponse;
use serde::Serialize;

pub fn now() -> i64 {
    chrono::Local::now().timestamp()
}

pub async fn simurgh_request(
    path: &str,
) -> Result<ClientResponse<Decoder<Payload>>, AppErr> {
    let Config { simurgh_project, simurgh_host, simurgh_auth, .. } = config();
    let client = awc::Client::new();
    let request = client
        .get(format!("{simurgh_host}/api/projects/{simurgh_project}{path}"))
        .insert_header(("authorization", simurgh_auth.as_str()));

    let mut result = request.send().await?;
    if result.status() != 200 {
        Err(result.json::<AppErr>().await?)
    } else {
        Ok(result)
    }
}

pub async fn heimdall_message(text: &str, tag: &str) {
    let client = awc::Client::new();
    let request = client
        .post(format!("https://heimdall.00-team.org/api/sites/messages/"))
        .insert_header(("authorization", config().heimdall_token.as_str()));

    #[derive(Serialize)]
    struct Message {
        text: String,
        tag: String,
    }

    let _ = request
        .send_json(&Message { text: text.to_string(), tag: tag.to_string() })
        .await;
}

pub trait CutOff {
    fn cut_off(&mut self, len: usize);
}

impl CutOff for String {
    fn cut_off(&mut self, len: usize) {
        let mut idx = len;
        loop {
            if self.is_char_boundary(idx) {
                break;
            }
            idx -= 1;
        }
        self.truncate(idx)
    }
}

impl CutOff for Option<String> {
    fn cut_off(&mut self, len: usize) {
        if let Some(v) = self {
            let mut idx = len;
            loop {
                if v.is_char_boundary(idx) {
                    break;
                }
                idx -= 1;
            }
            v.truncate(idx)
        }
    }
}

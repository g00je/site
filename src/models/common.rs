use actix_web::web::Json;
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use std::ops;

pub type Response<T> = Result<Json<T>, super::AppErr>;

#[derive(Deserialize)]
pub struct ListInput {
    pub page: u32,
}

#[derive(Debug, Deserialize, Default)]
pub struct JsonStr<T>(pub T);

impl<T> ops::Deref for JsonStr<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}

impl<T> ops::DerefMut for JsonStr<T> {
    fn deref_mut(&mut self) -> &mut T {
        &mut self.0
    }
}

impl<T: Serialize> Serialize for JsonStr<T> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.0.serialize(serializer)
    }
}

impl<T: DeserializeOwned + Default> From<String> for JsonStr<T> {
    fn from(value: String) -> Self {
        Self(serde_json::from_str::<T>(&value).unwrap_or(T::default()))
    }
}

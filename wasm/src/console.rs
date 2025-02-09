extern crate web_sys;

#[macro_export]
macro_rules! console_log {
  ($($args:expr),*) => {
    web_sys::console::log_1(&format!($($args),*).into())
  };
}

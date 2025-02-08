use wasm_bindgen::prelude::*;
use web_sys::{ WebSocket, MessageEvent };
use crate::console_log;

// static mut data: String = String::new();

#[wasm_bindgen]
pub fn connect_to_server(server_url: String) -> Result<(), JsValue> {
    let ws = WebSocket::new(&server_url).unwrap();
    let ws_clone = ws.clone();

    ws_clone.clone().set_onopen(Some(&Closure::once_into_js(move |_event: MessageEvent| {
        console_log!("Connected to server");
        match ws.clone().send_with_str("Hello, server!") {
            Ok(_) => console_log!("Message sent"),
            Err(e) => console_log!("Error sending message: {:?}", e),
        };
    }).as_ref().unchecked_ref()));

    ws_clone.clone().set_onmessage(Some(&Closure::once_into_js(move |event: MessageEvent| {
        console_log!("Message from server: {:?}", event.data());
    }).as_ref().unchecked_ref()));

    Ok(())
}

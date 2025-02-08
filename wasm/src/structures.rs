use wasm_bindgen::prelude::*;
use crate::vectors::*;
// use web_sys::console;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub struct Pixel {
  pub x: u32,
  pub y: u32,
  pub r: u8,
  pub g: u8,
  pub b: u8,
}

// #[derive(Clone, Copy)] // unused yet
// pub struct Color {
//     pub r: u8,
//     pub g: u8,
//     pub b: u8,
// }

#[derive(Clone, Copy, Debug)]
pub struct TriangleVertice {
  pub position: Vector3d,
  pub screen_position: Vector2d,
}

#[derive(Clone, Debug)]
pub struct TransformedTriangle {
  pub vertice1: TriangleVertice,
  pub vertice2: TriangleVertice,
  pub vertice3: TriangleVertice,
  pub texture_id: u32,
  pub normal: Vector3d,
}

#[wasm_bindgen]
#[derive(Clone, Debug)]
pub struct Texture {
  pub width: u32,
  pub height: u32,
  // pixels: Vec<Color>,
}

#[wasm_bindgen]
#[derive(Clone, Debug)]
pub struct WorldObject {
  pub vertice1: Vector3d,
  pub vertice2: Vector3d,
  pub vertice3: Vector3d,
  pub texture_id: u32,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub struct Player {
  pub position: Vector3d,
  pub rotation: Vector2d,
}

#[wasm_bindgen]
impl Player {
  #[wasm_bindgen(constructor)]
  pub fn new(position: Vector3d, rotation: Vector2d) -> Player {
    Player { position, rotation }
  }
}

#[wasm_bindgen]
impl Pixel {
  #[wasm_bindgen(constructor)]
  pub fn new(x: u32, y: u32, r: u8, g: u8, b: u8) -> Pixel {
    Pixel { x, y, r, g, b }
  }
}

#[wasm_bindgen]
impl WorldObject {
  #[wasm_bindgen(constructor)]
  pub fn new(vertice1: Vector3d, vertice2: Vector3d, vertice3: Vector3d, texture_id: u32) -> WorldObject {
    WorldObject { vertice1, vertice2, vertice3, texture_id }
  }
}
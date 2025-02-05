use wasm_bindgen::prelude::*;
use crate::vectors::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Pixel {
    pub x: u32,
    pub y: u32,
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

#[derive(Clone, Copy)]
pub struct Color {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

#[derive(Clone)]
pub struct TransformedTriangle {
    pub vertice1: Vector3d,
    pub vertice2: Vector3d,
    pub vertice3: Vector3d,
    pub texture_id: u32,
    pub normal: Vector3d,
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct Texture {
    pub width: u32,
    pub height: u32,
    pixels: Vec<Color>,
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct WorldObject {
    pub vertice1: Vector3d,
    pub vertice2: Vector3d,
    pub vertice3: Vector3d,
    pub texture_id: u32,
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Player {
    pub position: Vector3d,
    pub rotation: Vector3d,
}

#[wasm_bindgen]
impl Player {
  #[wasm_bindgen(constructor)]
  pub fn new(position: Vector3d, rotation: Vector3d) -> Player {
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
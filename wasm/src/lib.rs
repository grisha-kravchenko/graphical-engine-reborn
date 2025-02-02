use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Pixel {
    pub x: u32,
    pub y: u32,
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Vector3d {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Color {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct Texture {
    pub width: u32,
    pub height: u32,
    pixels: Vec<Color>,
}

#[wasm_bindgen]
pub struct World_object {
    pub vertice1: Vector3d,
    pub vertice2: Vector3d,
    pub vertice3: Vector3d,
    texture: Texture,
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
impl Vector3d {
  #[wasm_bindgen(constructor)]
  pub fn new(x: f32, y: f32, z: f32) -> Vector3d {
    Vector3d { x, y, z }
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
pub fn render_screen(pixels: Vec<Pixel>, world: Vec<World_object>, player: Player, textures: Vec<Texture>) -> Result<Vec<Pixel>, JsValue> {
    let mut new_pixels = Vec::with_capacity(pixels.len());
    for pixel in pixels {
        let position = Vector3d {
            x: pixel.x as f32,
            y: pixel.y as f32,
            z: 0.0,
        };
        
        new_pixels.push(pixel);
    }
    Ok(new_pixels)
}

pub fn project_vector(vector: Vector3d, player_position: Vector3d, angle: Vector3d) -> Vector3d {
    let x = (vector.z - player_position.z) * (- angle.x).sin() + (vector.x - player_position.x) * angle.x.cos();
    let z = (vector.z - player_position.z) * angle.x.cos() - (vector.x - player_position.x) * (- angle.x).sin();
    let y = z * angle.y.sin() + (vector.y - player_position.y) * angle.y.cos();
    let z = z * angle.y.cos() - (vector.y - player_position.y) * angle.y.sin();

    Vector3d { x, y, z }
}

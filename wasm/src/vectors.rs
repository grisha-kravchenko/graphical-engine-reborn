use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Vector3d {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Vector2d {
    pub x: f32,
    pub y: f32,
}

#[wasm_bindgen]
impl Vector3d {
  #[wasm_bindgen(constructor)]
  pub fn new(x: f32, y: f32, z: f32) -> Vector3d {
    Vector3d { x, y, z }
  }
  pub fn cross_product(self, other: Vector3d) -> Vector3d {
    Vector3d {
      x: self.y * other.z - self.z * other.y,
      y: self.z * other.x - self.x * other.z,
      z: self.x * other.y - self.y * other.x,
    }
  }
  pub fn dot_product(self, other: Vector3d) -> f32 {
    self.x * other.x + self.y * other.y + self.z * other.z
  }
  pub fn normalize(self) -> Vector3d {
    let length = self.length();
    Vector3d {
      x: self.x / length,
      y: self.y / length,
      z: self.z / length,
    }
  }
  pub fn length(self) -> f32 {
    (self.x * self.x + self.y * self.y + self.z * self.z).sqrt()
  }
  pub fn multiply(self, other: Vector3d) -> Vector3d {
    Vector3d {
      x: self.x * other.x,
      y: self.y * other.y,
      z: self.z * other.z,
    }
  }
  pub fn add(self, other: Vector3d) -> Vector3d {
    Vector3d {
      x: self.x + other.x,
      y: self.y + other.y,
      z: self.z + other.z,
    }
  }
  pub fn subtract(self, other: Vector3d) -> Vector3d {
    Vector3d {
      x: self.x - other.x,
      y: self.y - other.y,
      z: self.z - other.z,
    }
  }
  pub fn divide(self, other: Vector3d) -> Vector3d {
    Vector3d {
      x: self.x / other.x,
      y: self.y / other.y,
      z: self.z / other.z,
    }
  }
}

#[wasm_bindgen]
impl Vector2d {
  #[wasm_bindgen(constructor)]
  pub fn new(x: f32, y: f32) -> Vector2d {
    Vector2d { x, y }
  }
  pub fn dot_product(self, other: Vector2d) -> f32 {
    self.x * other.x + self.y * other.y
  }
  pub fn normalize(self) -> Vector2d {
    let length = self.length();
    Vector2d {
      x: self.x / length,
      y: self.y / length,
    }
  }
  pub fn length(self) -> f32 {
    (self.x * self.x + self.y * self.y).sqrt()
  }
  pub fn multiply(self, other: Vector2d) -> Vector2d {
    Vector2d {
      x: self.x * other.x,
      y: self.y * other.y,
    }
  }
  pub fn add(self, other: Vector2d) -> Vector2d {
    Vector2d {
      x: self.x + other.x,
      y: self.y + other.y,
    }
  }
  pub fn subtract(self, other: Vector2d) -> Vector2d {
    Vector2d {
      x: self.x - other.x,
      y: self.y - other.y,
    }
  }
  pub fn divide(self, other: Vector2d) -> Vector2d {
    Vector2d {
      x: self.x / other.x,
      y: self.y / other.y,
    }
  }
}

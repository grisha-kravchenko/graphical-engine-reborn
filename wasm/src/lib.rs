use wasm_bindgen::prelude::*;

mod structures;
mod vectors;
mod shaders;
mod quaternions;
#[macro_use]
mod console;

use structures::*;
use vectors::*;
use shaders::*;
use js_sys::Math;

const FOV: f32 = 100.0;
  #[wasm_bindgen]
  pub fn render_screen(pixels: Vec<Pixel>, world: Vec<WorldObject>, player: Player, light: f64) -> Result<Vec<Pixel>, JsValue> {
  let mut new_pixels: Vec<Pixel> = Vec::with_capacity(pixels.len());
  let transformed_world = transform_world(world.clone(), player);
  for pixel in pixels {
    let _position = Vector3d {
      x: pixel.x as f32,
      y: pixel.y as f32,
      z: 0.0,
    };
    let new_pixel = pixel_shader(pixel, transformed_world.clone(), light);
    new_pixels.push(new_pixel);
  }
  Ok(new_pixels)
}

pub fn project_vector(vector: Vector3d, player_position: Vector3d, player_rotation: Vector2d) -> Vector3d {
  let x = vector.x - player_position.x;
  let y = vector.y - player_position.y;
  let z = vector.z - player_position.z;

  let cache_operation = [Math::sin(player_rotation.x as f64) as f32, Math::cos(player_rotation.x as f64) as f32, Math::sin(player_rotation.y as f64) as f32, Math::cos(player_rotation.y as f64) as f32];

  let rotated_x = x * cache_operation[1] - z * cache_operation[0];
  let rotated_z = x * cache_operation[0] + z * cache_operation[1];
  let rotated_y = y * cache_operation[3] - rotated_z * cache_operation[2];
  let rotated_z = y * cache_operation[2] + rotated_z * cache_operation[3];

  if rotated_x.is_finite() && rotated_y.is_finite() && rotated_z.is_finite() {
    Vector3d { x: rotated_x, y: rotated_y, z: rotated_z }
  } else {
    Vector3d { x: 0.0, y: 0.0, z: 0.0 }
  }
}

pub fn transform_world(world: Vec<WorldObject>, player: Player) -> Vec<TransformedTriangle> {
  let mut new_world: Vec<TransformedTriangle> = Vec::with_capacity(world.len());
  for object in world {
    let mut transformed_triangle: Vec<Vector3d> = Vec::with_capacity(3);
    for vertice in [object.vertice1, object.vertice2, object.vertice3] {
      let projected = project_vector(vertice, player.position, player.rotation);
      transformed_triangle.push(projected);
    }

    let normal = transformed_triangle[1].subtract(transformed_triangle[0]).cross_product(transformed_triangle[2].subtract(transformed_triangle[0]));
    let transformed_triangle_vertices: Vec<TriangleVertice> = transformed_triangle.iter().map(|vertice| {
      let projected = project_vector(*vertice, player.position, player.rotation);
      TriangleVertice{ position: projected, screen_position: screen_position(projected) }
    }).collect();

    let transformed_triangle: TransformedTriangle = TransformedTriangle {
      vertice1: transformed_triangle_vertices[0],
      vertice2: transformed_triangle_vertices[1],
      vertice3: transformed_triangle_vertices[2],
      texture_id: object.texture_id,
      normal: normal,
    };

    new_world.push(transformed_triangle);
  }
  return new_world;
}

pub fn screen_position(position: Vector3d) -> Vector2d {
  Vector2d {
    x: round!(position.x * FOV / position.z),
    y: round!(position.y * FOV / position.z),
  }
}

#[macro_export]
macro_rules! round {
  ($x:expr) => {
    Math::round($x as f64) as f32
  };
}

#[macro_export]
macro_rules! floor {
  ($x:expr) => {
    Math::floor($x as f64) as f32
  };
}
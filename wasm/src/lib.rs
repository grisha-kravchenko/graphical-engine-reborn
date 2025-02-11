use wasm_bindgen::prelude::*;

mod structures;
mod vectors;
mod shaders;
mod quaternions;
mod websocket;
#[macro_use]
mod console;

use structures::*;
use vectors::*;
use shaders::*;
use js_sys::{ Math, Promise };
use wasm_bindgen_futures::future_to_promise;
use rayon::prelude::*;

#[cfg(feature = "parallel")]
pub use wasm_bindgen_rayon::init_thread_pool;

const FOV: f32 = 100.0;

#[wasm_bindgen]
pub fn render_screen(world: Vec<WorldObject>, player: Player, light: f64, screen_width: u32) -> Promise {
  future_to_promise(async move {
    // initialise variables
    let screen_area = (screen_width * screen_width) as usize; // calculate screen area
    let transformed_world = transform_world(world.clone(), player); // transform world
    let new_pixels: Vec<Color> = (0..screen_area)
      .into_par_iter() // parallel iteration
      .map(|index| {
        pixel_shader(index as u32, &transformed_world, light, FOV)
      })
      .collect();
    let output = JsValue::from(new_pixels);
    Ok(output)
  })
}

pub fn project_vector(vector: Vector3d, player_position: Vector3d, cache_operation: [f32; 4]) -> Vector3d {
  let x = vector.x - player_position.x;
  let y = vector.y - player_position.y;
  let z = vector.z - player_position.z;

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
  // transform world
  let mut transformed_world: Vec<TransformedTriangle> = Vec::with_capacity(world.len());
  for object in world {
    // transform triangle
    let mut transformed_triangle: Vec<TriangleVertice> = Vec::with_capacity(3);
    for vertice in [object.vertice1, object.vertice2, object.vertice3] {
      let cache_operation = [Math::sin(player.rotation.x as f64) as f32, Math::cos(player.rotation.x as f64) as f32, Math::sin(player.rotation.y as f64) as f32, Math::cos(player.rotation.y as f64) as f32];

      let projected = project_vector(vertice, player.position, cache_operation);
      transformed_triangle.push(TriangleVertice { position: projected, screen_position: screen_position(projected) });
    }

    // calculate normal
    let normal = transformed_triangle[1].position.subtract(transformed_triangle[0].position).cross_product(transformed_triangle[2].position.subtract(transformed_triangle[0].position));

    // push transformed triangle
    let transformed_triangle: TransformedTriangle = TransformedTriangle {
      vertice1: transformed_triangle[0],
      vertice2: transformed_triangle[1],
      vertice3: transformed_triangle[2],
      texture_id: object.texture_id,
      normal: normal,
    };

    transformed_world.push(transformed_triangle);
  }
  transformed_world
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
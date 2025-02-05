use wasm_bindgen::prelude::*;
mod structures;
mod vectors;
use structures::*;
use vectors::*;

#[wasm_bindgen]
pub fn render_screen(pixels: Vec<Pixel>, world: Vec<WorldObject>, player: Player, textures: Vec<Texture>) -> Result<Vec<Pixel>, JsValue> {
  let mut new_pixels = Vec::with_capacity(pixels.len());
  let transformed_world = transform_world(world, player);
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

pub fn transform_world(world: Vec<WorldObject>, player: Player) -> Vec<TransformedTriangle> {
  let mut new_world: Vec<TransformedTriangle> = Vec::with_capacity(world.len());
  for object in world {
    let mut transformed_triangle: Vec<Vector3d> = Vec::with_capacity(3);
    for vertice in [object.vertice1, object.vertice2, object.vertice3] {
      let projected = project_vector(vertice, player.position, player.rotation);
      transformed_triangle.push(projected);
    }

    let normal = transformed_triangle[0].cross_product(transformed_triangle[1]);

    let transformed_triangle: TransformedTriangle = TransformedTriangle {
      vertice1: transformed_triangle[0],
      vertice2: transformed_triangle[1],
      vertice3: transformed_triangle[2],
      texture_id: object.texture_id,
      normal: normal,
    };

    new_world.push(transformed_triangle);
  }
  return new_world;
}
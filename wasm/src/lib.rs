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
use quaternions::Quaternion;

#[wasm_bindgen]
pub fn render_screen(pixels: Vec<Pixel>, world: Vec<WorldObject>, player: Player) -> Result<Vec<Pixel>, JsValue> {
  let mut new_pixels: Vec<Pixel> = Vec::with_capacity(pixels.len());
  let transformed_world = transform_world(world.clone(), player);
  console_log!("world: {:?}", world.clone());
  console_log!("transformed_world: {:?}", transformed_world.clone());
  for pixel in pixels {
    let _position = Vector3d {
      x: pixel.x as f32,
      y: pixel.y as f32,
      z: 0.0,
    };
    let new_pixel = pixel_shader(pixel, transformed_world.clone());
    new_pixels.push(new_pixel);
  }
  Ok(new_pixels)
}

pub fn project_vector(vector: Vector3d, player_position: Vector3d, player_rotation: Vector3d) -> Vector3d {
    console_log!("Input vector: {:?}", vector);
    console_log!("Player position: {:?}", player_position);
    console_log!("Player rotation: {:?}", player_rotation);

    // Convert rotation angles to radians
    let rotation_x = player_rotation.x.to_radians();
    let rotation_y = player_rotation.y.to_radians();
    let rotation_z = player_rotation.z.to_radians();

    // Create quaternions for each rotation axis
    let qx = Quaternion::from_axis_angle(&Vector3d::new(1.0, 0.0, 0.0), rotation_x);
    let qy = Quaternion::from_axis_angle(&Vector3d::new(0.0, 1.0, 0.0), rotation_y);
    let qz = Quaternion::from_axis_angle(&Vector3d::new(0.0, 0.0, 1.0), rotation_z);

    console_log!("qx: {:?}", qx);
    console_log!("qy: {:?}", qy);
    console_log!("qz: {:?}", qz);

    // Combine rotations (order matters: Z * Y * X)
    let combined_rotation = qz.multiply(&qy).multiply(&qx);

    console_log!("combined_rotation: {:?}", combined_rotation);

    // Translate the vector so that the player is in the center
    let translated_vector = Vector3d::new(
        vector.x - player_position.x,
        vector.y - player_position.y,
        vector.z - player_position.z,
    );

    console_log!("translated_vector: {:?}", translated_vector);

    // Rotate the translated vector using the combined rotation quaternion
    let rotated_vector = combined_rotation.rotate_vector(&translated_vector);

    console_log!("rotated_vector: {:?}", rotated_vector);

    // Perform perspective division
    let z = rotated_vector.z;
    let x = rotated_vector.x;
    let y = rotated_vector.y;

    if x.is_finite() && y.is_finite() && z.is_finite() {
        Vector3d { x, y, z }
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

    let normal = transformed_triangle[0].cross_product(transformed_triangle[1]);
    let transformed_triangle_vertices: Vec<TriangleVertice> = transformed_triangle.iter().map(|vertice| {
      let projected = project_vector(*vertice, player.position, player.rotation);
      TriangleVertice{ position: projected, screen_position: Vector2d{ x: 0.0, y: 0.0 } }
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
use crate::structures::*;
use crate::{console_log, floor, round};
use crate::vectors::*;
use js_sys::Math;

pub fn pixel_shader(pixel: Pixel, world: Vec<TransformedTriangle>, light: f64) -> Pixel {
  let mut color: Vec<u8> = Vec::from([0, 0, 0]);
  for triangle in world {
    let mut triangle_vertices: Vec<Vector2d> = Vec::with_capacity(3);
    for vertice in [triangle.vertice1, triangle.vertice2, triangle.vertice3] {
      triangle_vertices.push(vertice.screen_position);
    }
    if pixel_in_triangle(pixel, triangle_vertices) {
      let triangle_points = Vec::from([triangle.vertice1.position, triangle.vertice2.position, triangle.vertice3.position]);
      let distance = distance_to_triangle(pixel, triangle_points, triangle.normal);
      color = Vec::from([Math::min(round!(Math::max(light / distance as f64, 0.0)) as f64, 255.0) as u8, Math::min(round!(Math::max(light / distance as f64, 0.0)) as f64, 255.0) as u8, Math::min(round!(Math::max(light / distance as f64, 0.0)) as f64, 255.0) as u8]);
    }
  }
  Pixel { x: pixel.x, y: pixel.y, r: color[0], g: color[1], b: color[2] }
}

pub fn pixel_in_triangle(pixel: Pixel, triangle: Vec<Vector2d>) -> bool {
  let denominator = (triangle[1].y - triangle[2].y) * (triangle[0].x - triangle[2].x) + (triangle[2].x - triangle[1].x) * (triangle[0].y - triangle[2].y);

  if denominator == 0.0 {
    console_log!("denominator: {:?}", denominator);
    return false; // Triangle is degenerate
  }

  // Calculate barycentric coordinates (https://en.wikipedia.org/wiki/Barycentric_coordinate_system)
  // alpha = ((v2y - v3y) * (px - v3x) + (v3x - v2x) * (py - v3y)) / denominator
  // beta = ((v3y - v1y) * (px - v3x) + (v1x - v3x) * (py - v3y)) / denominator
  // gamma = 1.0 - alpha - beta

  let alpha = ((triangle[1].y - triangle[2].y) * (pixel.x as f32 - triangle[2].x) + (triangle[2].x - triangle[1].x) * (pixel.y as f32 - triangle[2].y)) / denominator;
  let beta = ((triangle[2].y - triangle[0].y) * (pixel.x as f32 - triangle[2].x) + (triangle[0].x - triangle[2].x) * (pixel.y as f32 - triangle[2].y)) / denominator;
  let gamma = 1.0 - alpha - beta;

  floor!(alpha * 1000.0) > 0.0 && floor!(beta * 1000.0) > 0.0 && floor!(gamma * 1000.0) > 0.0
}

pub fn distance_to_triangle(pixel: Pixel, triangle: Vec<Vector3d>, normal: Vector3d) -> f32 {
  // Calculate the distance from the pixel to the plane
  let pixel_pos = Vector3d::new(pixel.x as f32, pixel.y as f32, 0.0); // Assuming pixel z is 0
  let distance = normal.dot_product(triangle[0].subtract(pixel_pos)) / normal.length();

  distance.abs()
}
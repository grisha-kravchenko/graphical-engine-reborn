use crate::structures::*;
use crate::console_log;
use crate::vectors::*;
use js_sys::Math;
pub fn pixel_shader(pixel: Pixel, world: Vec<TransformedTriangle>) -> Pixel {
  let mut color: Vec<u8> = Vec::from([0, 0, 0]);
  for triangle in world {
    let mut triangle_vertices: Vec<Vector2d> = Vec::with_capacity(3);
    for vertice in [triangle.vertice1, triangle.vertice2, triangle.vertice3] {
      triangle_vertices.push(vertice.screen_position);
    }
    if pixel_in_triangle(pixel, triangle_vertices) {
      color = Vec::from([255, 255, 255]); 
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
  // formula is:
  // alpha = ((v2y - v3y) * (px - v3x) + (v3x - v2x) * (py - v3y)) / denominator
  // beta = ((v3y - v1y) * (px - v3x) + (v1x - v3x) * (py - v3y)) / denominator
  // gamma = 1.0 - alpha - beta

  let alpha = ((triangle[1].y - triangle[2].y) * (pixel.x as f32 - triangle[2].x) + (triangle[2].x - triangle[1].x) * (pixel.y as f32 - triangle[2].y)) / denominator;
  let beta = ((triangle[2].y - triangle[0].y) * (pixel.x as f32 - triangle[2].x) + (triangle[0].x - triangle[2].x) * (pixel.y as f32 - triangle[2].y)) / denominator;
  let gamma = 1.0 - alpha - beta;

  Math::floor((alpha * 1000.0) as f64) > 0.0 && Math::floor((beta * 1000.0) as f64) > 0.0 && Math::floor((gamma * 1000.0) as f64) > 0.0
}
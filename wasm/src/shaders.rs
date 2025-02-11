use crate::structures::*;
use crate::{ floor, round };
use crate::vectors::*;
use js_sys::Math;

pub fn pixel_shader(index: u32, world: &Vec<TransformedTriangle>, light: f64, fov: f32) -> Color {
  let pixel = Vector2d { x: index as f32 % fov, y: index as f32 / fov };
  let mut color: Vec<u8> = Vec::from([0, 0, 0]);
  for triangle in world {
    let mut triangle_vertices: Vec<Vector2d> = Vec::with_capacity(3);
    for vertice in [triangle.vertice1, triangle.vertice2, triangle.vertice3] {
      triangle_vertices.push(vertice.screen_position);
    }
    if pixel_in_triangle(pixel, triangle_vertices) {
      let triangle_points = Vec::from([triangle.vertice1.position, triangle.vertice2.position, triangle.vertice3.position]);
      let distance = distance_to_triangle(pixel, triangle_points, triangle.normal, fov);
      if distance > 0.0 {
        color = Vec::from([Math::min(round!(Math::max(light / distance as f64, 0.0)) as f64, 255.0) as u8, Math::min(round!(Math::max(light / distance as f64, 0.0)) as f64, 255.0) as u8, Math::min(round!(Math::max(light / distance as f64, 0.0)) as f64, 255.0) as u8]);
      }
    }
  }
  Color { r: color[0], g: color[1], b: color[2] }
}

pub fn pixel_in_triangle(pixel: Vector2d, triangle: Vec<Vector2d>) -> bool {
  let denominator = (triangle[1].y - triangle[2].y) * (triangle[0].x - triangle[2].x) + (triangle[2].x - triangle[1].x) * (triangle[0].y - triangle[2].y);

  if denominator == 0.0 {
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

pub fn distance_to_triangle(pixel: Vector2d, triangle: Vec<Vector3d>, normal: Vector3d, fov: f32) -> f32 {
  // t = - (N · (O - V1)) / (N · D)

  let ray = Vec::from([Vector3d { x: pixel.x as f32 / fov, y: pixel.y as f32 / fov, z: 1.0 }, Vector3d { x: pixel.x * 2.0 / fov, y: pixel.y * 2.0 / fov, z: 2.0 }]);
  -normal.dot_product(ray[0].subtract(triangle[0])) / normal.dot_product(ray[1])
}
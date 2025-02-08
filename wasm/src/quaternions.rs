use wasm_bindgen::prelude::*;
use crate::vectors::Vector3d;

#[wasm_bindgen]
#[derive(Debug, Copy, Clone, PartialEq)] // Enable debugging, copying, cloning, and equality checks
pub struct Quaternion {
    pub w: f32, // Scalar component
    pub x: f32, // i component
    pub y: f32, // j component
    pub z: f32, // k component
}

#[wasm_bindgen]
impl Quaternion {
    #[wasm_bindgen(constructor)]
    pub fn new(w: f32, x: f32, y: f32, z: f32) -> Quaternion {
        Quaternion { w, x, y, z }
    }

    // Identity quaternion (no rotation)
    #[wasm_bindgen(getter)]
    pub fn identity() -> Self {
        Quaternion { w: 1.0, x: 0.0, y: 0.0, z: 0.0 }
    }

    // Quaternion multiplication
    pub fn multiply(&self, other: &Quaternion) -> Self {
        Quaternion {
            w: self.w * other.w - self.x * other.x - self.y * other.y - self.z * other.z,
            x: self.w * other.x + self.x * other.w + self.y * other.z - self.z * other.y,
            y: self.w * other.y - self.x * other.z + self.y * other.w + self.z * other.x,
            z: self.w * other.z + self.x * other.y - self.y * other.x + self.z * other.w,
        }
    }

    // Rotate a 3D vector by this quaternion
    pub fn rotate_vector(&self, vector: &Vector3d) -> Vector3d {
        // Convert vector to a pure quaternion
        let vector_quat = Quaternion { w: 0.0, x: vector.x, y: vector.y, z: vector.z };
        // Perform rotation: rotated_vector = q * v * q_inverse
        let rotated_quat = self.multiply(&vector_quat).multiply(&self.inverse());
        Vector3d { x: rotated_quat.x, y: rotated_quat.y, z: rotated_quat.z }
    }

    // Calculate the magnitude (norm) of the quaternion
    pub fn magnitude(&self) -> f32 {
        (self.w * self.w + self.x * self.x + self.y * self.y + self.z * self.z).sqrt()
    }

    // Normalize the quaternion to unit length
    pub fn normalize(&mut self) {
        let mag = self.magnitude();
        if mag > 0.0 {
            self.w /= mag;
            self.x /= mag;
            self.y /= mag;
            self.z /= mag;
        }
    }

    // Conjugate of the quaternion
    pub fn conjugate(&self) -> Self {
        Quaternion {
            w: self.w,
            x: -self.x,
            y: -self.y,
            z: -self.z,
        }
    }

    // Inverse of the quaternion
    pub fn inverse(&self) -> Self {
        let mag_sq = self.w * self.w + self.x * self.x + self.y * self.y + self.z * self.z;
        if mag_sq == 0.0 {
            Quaternion::identity() // Return identity if magnitude is zero to avoid division by zero
        } else {
            let conj = self.conjugate();
            Quaternion {
                w: conj.w / mag_sq,
                x: conj.x / mag_sq,
                y: conj.y / mag_sq,
                z: conj.z / mag_sq,
            }
        }
    }

    // Create a quaternion from an axis and angle (in radians)
    pub fn from_axis_angle(axis: &Vector3d, angle: f32) -> Self {
        let half_angle = angle / 2.0;
        let sin_half_angle = half_angle.sin();
        let axis_normalized = { // Normalize the axis vector
            let mag = (axis.x * axis.x + axis.y * axis.y + axis.z * axis.z).sqrt();
            if mag == 0.0 {
                Vector3d { x: 0.0, y: 1.0, z: 0.0 } // Default axis if input axis is zero vector (e.g., Y-axis)
            } else {
                Vector3d { x: axis.x / mag, y: axis.y / mag, z: axis.z / mag }
            }
        };

        Quaternion {
            w: half_angle.cos(),
            x: axis_normalized.x * sin_half_angle,
            y: axis_normalized.y * sin_half_angle,
            z: axis_normalized.z * sin_half_angle,
        }
    }
}
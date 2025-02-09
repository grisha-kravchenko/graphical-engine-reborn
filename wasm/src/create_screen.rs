use crate::structures::Pixel;

pub fn new_screen(screen_width: u32) -> Vec<Pixel> {
	let mut pixels = Vec::with_capacity((screen_width * screen_width) as usize);
	for i in 0..screen_width * screen_width {
		pixels.push(Pixel{ x: i % screen_width, y: i / screen_width, r: 0, g: 0, b: 0 });
	}
	pixels
}
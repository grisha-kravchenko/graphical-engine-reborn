/**
 * @description Draws the screen on the canvas
 * @param {Object} screenProperties
 * @param {Array} pixels
 * @param {Object} ctx
 */
const drawScreen = (pixels, screenProperties, ctx) => {
	let { pixelSize } = screenProperties;

	pixelSize = Math.max(pixelSize, pixelSize);

	pixels.forEach((pixel) => {
		const { x, y, r, g, b } = pixel;

		ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
		ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
	});
}

export { drawScreen };
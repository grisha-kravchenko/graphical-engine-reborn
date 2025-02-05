import { Pixel } from '../wasm/wasm.js';

/**
 * @description Creates a screen object with the given resolution
 * @param {number} resolution
 * @returns {Object}
 */

const screen = (resolution) => {
    const ctx = $("#canvas")[0].getContext('2d');

    const size = $("#canvas")[0].width;
    const pixelSize = size / resolution;

    const pixels = new Array(resolution ** 2).fill(0).map((_, id) => {
        const x = id % resolution;
        const y = Math.floor(id / resolution);
        const color = () => Math.floor(Math.random() * 255);
        const rgb = {r: color(), g: color(), b: color()};

        return new Pixel(x, y, rgb.r, rgb.g, rgb.b);
    });

    const screenProperties = { size, pixelSize };
    return { screenProperties, pixels, ctx };
}

/**
 * @description Draws the screen on the canvas
 * @param {Object} screenProperties
 * @param {Array} pixels
 * @param {Object} ctx
 */
const drawScreen = (screenProperties, pixels, ctx) => {
    let { pixelSize } = screenProperties;

    pixelSize = Math.max(pixelSize, pixelSize);

    pixels.forEach((pixel) => {
        const { x, y, r, g, b } = pixel;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });
}

export { screen, drawScreen };
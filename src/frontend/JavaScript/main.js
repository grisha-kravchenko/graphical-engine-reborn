import init, { render_screen, connect_to_server } from '../wasm/wasm.js';
import { screen, drawScreen, refreshPixels } from './canvas.js';
import { initializeControls, getPlayer } from './controls.js';
import { default as localConfig } from '../wasm/clientLocalConfig.js';
import { loadWorldObjects } from './world.js';
const tickTime = 20;

await init();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loop = async (screenObject) => {
	while (true) {
		const copyPixels = refreshPixels(screenObject.pixels);
		const worldObjects = loadWorldObjects();
		const pixels = render_screen(copyPixels, worldObjects, getPlayer(), 20000);
		drawScreen(screenObject.screenProperties, pixels, screenObject.ctx);
		await sleep(tickTime);
	}
}

init().then(() => {
	console.log("init");
	const screenObject = screen(100);
	connect_to_server(localConfig.websocketServerAddress);
	initializeControls();
	new Promise(() => loop(screenObject));
});
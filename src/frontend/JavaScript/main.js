import init, { render_screen, Player, Vector3d, Vector2d, connect_to_server } from '../wasm/wasm.js';
import { screen, drawScreen, refreshPixels } from './canvas.js';
import { initializeControls, getPlayer } from './controls.js';
import { default as localConfig } from '../wasm/clientLocalConfig.js';
import { loadWorldObjects } from './world.js';
const tickTime = 100;

await init();

let playerGlobal;
const player = () => new Player(playerGlobal.position, playerGlobal.rotation);

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
	const playerRotation = [-10, -5];
	connect_to_server(localConfig.websocketServerAddress);
	initializeControls();
	playerGlobal = new Player(new Vector3d(0, 0, -200), new Vector2d(playerRotation[0] * Math.PI / 180, playerRotation[1] * Math.PI / 180));
	new Promise(() => loop(screenObject));
});
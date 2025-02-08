import init, { render_screen, Player, Vector3d } from '../wasm/wasm.js';
import { screen, drawScreen, refreshPixels } from './canvas.js';
import { loadWorldObjects } from './world.js';
const tickTime = 100;

await init();

let playerGlobal;
const player = () => new Player(playerGlobal.position, playerGlobal.rotation);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loop = async (screenObject) => {
	// while (true) {
		const copyPixels = refreshPixels(screenObject.pixels);
		const worldObjects = loadWorldObjects();
		const pixels = render_screen(copyPixels, worldObjects, player());
		drawScreen(screenObject.screenProperties, pixels, screenObject.ctx);
		await sleep(tickTime);
	// }
}

const cameraRotation = (yaw, pitch) => {
	const x = Math.sin(yaw * Math.PI / 180) * Math.cos(pitch * Math.PI / 180);
	const y = Math.sin(pitch * Math.PI / 180);
	const z = Math.cos(yaw * Math.PI / 180) * Math.cos(pitch * Math.PI / 180);
	return new Vector3d(x, y, z);
}

init().then(() => {
	console.log("init");
	const screenObject = screen(100);
	playerGlobal = new Player(new Vector3d(0, 0, 0), cameraRotation(180, 90));
	new Promise(() => loop(screenObject));
});
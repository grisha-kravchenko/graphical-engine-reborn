import init, { render_screen, Player, Vector3d, Vector2d } from '../wasm/wasm.js';
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

// const cameraRotation = (yaw, pitch) => {
// 	const x = Math.round(Math.sin(yaw * Math.PI / 180) * Math.cos(pitch * Math.PI / 180) * 10000) / 10000;
// 	const y = Math.round(Math.sin(pitch * Math.PI / 180) * 10000) / 10000;
// 	const z = Math.round(Math.cos(yaw * Math.PI / 180) * Math.cos(pitch * Math.PI / 180) * 10000) / 10000;
// 	return new Vector3d(x, y, z);
// }

init().then(() => {
	console.log("init");
	const screenObject = screen(100);
	const playerRotation = [-5, -2];
	playerGlobal = new Player(new Vector3d(0, 0, -100), new Vector2d(playerRotation[0] * Math.PI / 180, playerRotation[1] * Math.PI / 180));
	new Promise(() => loop(screenObject));
});
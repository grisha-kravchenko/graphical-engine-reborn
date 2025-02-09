import { Player, Vector3d, Vector2d } from '../wasm/wasm.js';
let playerGlobal = {position: {x: 0, y: 0, z: -100}, rotation: {x: 0, y: 0}};
let keyPressed = new Object();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getPlayer = () => {
	const player = {
		position: new Vector3d(playerGlobal.position.x, playerGlobal.position.y, playerGlobal.position.z),
		rotation: new Vector2d(playerGlobal.rotation.x, playerGlobal.rotation.y),
	}
  return new Player(player.position, player.rotation);
}

const controlTick = async (delay) => {
	const key = (input) => keyPressed[input] ? 1 : 0;
	while (true) {
		const playerLocal = {position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0}};
		playerLocal.position.x = playerGlobal.position.x + (key('w') - key('s')) * Math.sin(playerGlobal.rotation.x * Math.PI / 180) + (key('d') - key('a')) * Math.cos(playerGlobal.rotation.x * Math.PI / 180);
		playerLocal.position.z = playerGlobal.position.z + (key('w') - key('s')) * Math.cos(playerGlobal.rotation.x * Math.PI / 180) + (key('d') - key('a')) * Math.sin(playerGlobal.rotation.x * Math.PI / 180);
		playerLocal.rotation.x = playerGlobal.rotation.x + (key('ArrowRight') - key('ArrowLeft')) * 0.01;
		playerLocal.rotation.y = playerGlobal.rotation.y + (key('ArrowDown') - key('ArrowUp')) * 0.01;

    playerGlobal = playerLocal;
		await sleep(delay);
	}
}

const initializeControls = () => {
	document.addEventListener('keydown', (event) => {
		keyPressed[event.key] = true;
	});

	document.addEventListener('keyup', (event) => {
		keyPressed[event.key] = false;
	});

  controlTick(10);
}

export { getPlayer, initializeControls };
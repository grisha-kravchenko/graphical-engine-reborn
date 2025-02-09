import { Player, Vector3d, Vector2d } from '../wasm/wasm.js';
let playerGlobal = {position: {x: 0, y: 0, z: -100}, rotation: {x: 0, y: 0}, velocityY: 0};
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
		const playerLocal = {position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0}, velocityY: 0};
		const moveSpeed = 1;
		let forwardMove = (key('w') - key('s')) * moveSpeed;
		let strafeMove = (key('d') - key('a')) * moveSpeed;

		playerLocal.position.x = playerGlobal.position.x + forwardMove * Math.sin(playerGlobal.rotation.x) + strafeMove * Math.cos(playerGlobal.rotation.x);
		playerLocal.position.z = playerGlobal.position.z + forwardMove * Math.cos(playerGlobal.rotation.x) - strafeMove * Math.sin(playerGlobal.rotation.x);
		playerLocal.rotation.x = playerGlobal.rotation.x + (key('ArrowRight') - key('ArrowLeft')) * 0.01;
		playerLocal.rotation.y = playerGlobal.rotation.y + (key('ArrowDown') - key('ArrowUp')) * 0.01;
		playerGlobal.position.y >= 0 ? playerLocal.velocityY = key(' ') * -10 : playerLocal.velocityY = playerGlobal.velocityY + 0.25;
		playerLocal.position.y = Math.min(playerGlobal.position.y + playerLocal.velocityY, 0);

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
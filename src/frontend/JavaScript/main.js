import init, { render_screen, connect_to_server } from '../wasm/wasm.js';
import { drawScreen } from './canvas.js';
import { initializeControls, getPlayer } from './controls.js';
import { default as localConfig } from '../wasm/clientLocalConfig.js';
import { loadWorldObjects } from './world.js';
const tickTime = 50;
const screenProperties = {
	width: 100,
	pixelSize: $("#canvas")[0].width / 100,
};

await init();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let isRunning = true;
let loopHandle;

const loop = async (ctx) => {
	while (isRunning) {
		const worldObjects = loadWorldObjects();
		const pixels = render_screen(worldObjects, getPlayer(), 20000, screenProperties.width);
		pixels.then(pixels => drawScreen(pixels, screenProperties, ctx));
		await sleep(tickTime);
	}
}

const startLoop = (ctx) => {
	if (!loopHandle) {
		isRunning = true;
		loopHandle = new Promise(() => loop(ctx));
	}
};

const stopLoop = () => {
	isRunning = false;
	loopHandle = null;
};

init().then(() => {
	console.log("init");
	connect_to_server(localConfig.websocketServerAddress);
	initializeControls();
	const ctx = $("#canvas")[0].getContext('2d');
	startLoop(ctx);

	let pause_window;

	window.addEventListener('focus', () => {
		$('#canvas').css('filter', 'none');
		pause_window.remove();
		startLoop(ctx);
	});

	window.addEventListener('blur', () => {
		$('#canvas').css('filter', 'blur(10px)');
		pause_window = $('<div class="pause-window">Paused</div>');
		$('body').append(pause_window);
		stopLoop();
	});
});
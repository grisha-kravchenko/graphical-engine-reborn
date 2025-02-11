import init, { render_screen, connect_to_server, initThreadPool } from '../wasm/wasm.js';
import { drawScreen } from './canvas.js';
import { initializeControls, getPlayer } from './controls.js';
import { default as localConfig } from '../wasm/clientLocalConfig.js';
import { loadWorldObjects } from './world.js';
const tickTime = 50;
const screenProperties = {
	width: 100,
	pixelSize: $("#canvas")[0].width / 100,
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let isRunning = true;
let loopHandle;

const loop = async (ctx, once = false) => {
	while (isRunning) {
		const worldObjects = loadWorldObjects();
		const pixels = render_screen(worldObjects, getPlayer(), 20000, screenProperties.width);
    console.time("render_screen");
		pixels.then(pixels => {
      console.timeEnd("render_screen");
      drawScreen(pixels, screenProperties, ctx);
    });
		await sleep(tickTime);
    if (once) {
      break;
    }
	}
}

init()
  .then(async () => await initThreadPool(navigator.hardwareConcurrency))
  .then(async () => {
    console.log(self.crossOriginIsolated);
    console.log("init");
    connect_to_server(localConfig.websocketServerAddress);
    initializeControls();
	const ctx = $("#canvas")[0].getContext('2d');

  let pause_window;

  const startLoop = () => {
    if (!loopHandle) {
      isRunning = true;
      loopHandle = new Promise(() => loop(ctx));
      $('#canvas').css('filter', 'none');
      pause_window.remove();
    }
  };

  const stopLoop = () => {
    isRunning = false;
    loopHandle = null;
    $('#canvas').css('filter', 'blur(10px)');
    pause_window = $('<div class="pause-window">Paused</div>');
    $('body').append(pause_window);
  };

  document.hasFocus() ? startLoop() : (() => {loop(ctx, true); stopLoop()})(); // start logic

	window.addEventListener('focus', startLoop);
	window.addEventListener('blur', stopLoop);
});
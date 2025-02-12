import init, { render_screen, connect_to_server, initThreadPool } from '../wasm/wasm.js';
import { drawScreen } from './canvas.js';
import { initializeControls, getPlayer, toggleRunning } from './controls.js';
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

const loop = async (ctx, gpu, once = false) => {
	while (isRunning) {
		const worldObjects = loadWorldObjects();
		const pixels = render_screen(worldObjects, getPlayer(), 20000, screenProperties.width, gpu);
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
    console.log("init");
    connect_to_server(localConfig.websocketServerAddress);
    const ctx = $("#canvas")[0].getContext('2d');

    let UI = new UIclass();
    $('.side-bar-toggle').click(() => UI.toggleSideBar(startLoop, stopLoop));

    let pause_window;
    let gpu = false;

    $('#gpu-toggle').click(() => {
      gpu = !gpu;
      $('#gpu-toggle').text(gpu ? 'Disable GPU' : 'Enable GPU');
      stopLoop();
    });

    const startLoop = () => {
      if (!loopHandle) {
        isRunning = true;
        toggleRunning(true);
        initializeControls();
        loopHandle = new Promise(() => loop(ctx, gpu));
        $('#canvas').css('filter', 'none');
        pause_window.remove();
        pause_window = null;
      }
    };

    const stopLoop = () => {
      isRunning = false;
      toggleRunning(false);
      loopHandle = null;
      $('#canvas').css('filter', 'blur(10px)');
      if (!pause_window) {
        pause_window = $('<div class="pause-window">Paused</div>');
        $('body').append(pause_window);
      }
    };

    document.hasFocus() ? startLoop() : (() => {loop(ctx, true); stopLoop()})(); // start logic

    window.addEventListener('focus', startLoop);
    window.addEventListener('blur', stopLoop);
});

class UIclass {
  constructor() {
    this.sideBar = document.querySelector('.side-bar');
    this.sideBar.toggled = false
  }

  toggleSideBar(startLoop, stopLoop

  ) {
    this.sideBar.classList.toggle('side-bar-active');
    this.sideBar.toggled ? startLoop() : stopLoop();
    this.sideBar.toggled = !this.sideBar.toggled;
    $('.side-bar-toggle').blur();
  }
}
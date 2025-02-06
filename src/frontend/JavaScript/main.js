import init, { render_screen, Player, Vector3d } from '../wasm/wasm.js';
import { screen, drawScreen, refreshPixels } from './canvas.js';
const tickTime = 100;

await init();

let playerGlobal;
const player = () => new Player(playerGlobal.position, playerGlobal.rotation);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loop = async (screenObject) => {
    while (true) {
        const copyPixels = refreshPixels(screenObject.pixels);
        const pixels = render_screen(copyPixels, new Array(), player(), new Array());
        drawScreen(screenObject.screenProperties, pixels, screenObject.ctx);
        await sleep(tickTime);
    }
}

init().then(() => {
    console.log("init");
    const screenObject = screen(100);
    playerGlobal = new Player(new Vector3d(0, 0, 0), new Vector3d(0, 0, 0));
    new Promise(() =>loop(screenObject));
});
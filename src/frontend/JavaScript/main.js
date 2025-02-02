import init, { render_screen, Player, Vector3d } from '../wasm/wasm.js';
import { screen, drawScreen } from './canvas.js';

init().then(() => {
    const screenObject = screen(100);
    const player = new Player(new Vector3d(0, 0, 0), new Vector3d(0, 0, 0));
    const pixels = render_screen(screenObject.pixels, new Array(), player, new Array());
    drawScreen(screenObject.screenProperties, pixels, screenObject.ctx);
});
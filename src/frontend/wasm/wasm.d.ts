/* tslint:disable */
/* eslint-disable */
export function render_screen(pixels: Pixel[], world: World_object[], player: Player, textures: Texture[]): Pixel[];
export class Color {
  private constructor();
  free(): void;
  r: number;
  g: number;
  b: number;
}
export class Pixel {
  free(): void;
  constructor(x: number, y: number, r: number, g: number, b: number);
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}
export class Player {
  free(): void;
  constructor(position: Vector3d, rotation: Vector3d);
  position: Vector3d;
  rotation: Vector3d;
}
export class Texture {
  private constructor();
  free(): void;
  width: number;
  height: number;
}
export class Vector3d {
  free(): void;
  constructor(x: number, y: number, z: number);
  x: number;
  y: number;
  z: number;
}
export class World_object {
  private constructor();
  free(): void;
  vertice1: Vector3d;
  vertice2: Vector3d;
  vertice3: Vector3d;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_pixel_free: (a: number, b: number) => void;
  readonly __wbg_get_pixel_x: (a: number) => number;
  readonly __wbg_set_pixel_x: (a: number, b: number) => void;
  readonly __wbg_get_pixel_y: (a: number) => number;
  readonly __wbg_set_pixel_y: (a: number, b: number) => void;
  readonly __wbg_get_pixel_r: (a: number) => number;
  readonly __wbg_set_pixel_r: (a: number, b: number) => void;
  readonly __wbg_get_pixel_g: (a: number) => number;
  readonly __wbg_set_pixel_g: (a: number, b: number) => void;
  readonly __wbg_get_pixel_b: (a: number) => number;
  readonly __wbg_set_pixel_b: (a: number, b: number) => void;
  readonly __wbg_vector3d_free: (a: number, b: number) => void;
  readonly __wbg_get_vector3d_x: (a: number) => number;
  readonly __wbg_set_vector3d_x: (a: number, b: number) => void;
  readonly __wbg_get_vector3d_y: (a: number) => number;
  readonly __wbg_set_vector3d_y: (a: number, b: number) => void;
  readonly __wbg_get_vector3d_z: (a: number) => number;
  readonly __wbg_set_vector3d_z: (a: number, b: number) => void;
  readonly __wbg_color_free: (a: number, b: number) => void;
  readonly __wbg_get_color_r: (a: number) => number;
  readonly __wbg_set_color_r: (a: number, b: number) => void;
  readonly __wbg_get_color_g: (a: number) => number;
  readonly __wbg_set_color_g: (a: number, b: number) => void;
  readonly __wbg_get_color_b: (a: number) => number;
  readonly __wbg_set_color_b: (a: number, b: number) => void;
  readonly __wbg_texture_free: (a: number, b: number) => void;
  readonly __wbg_get_texture_width: (a: number) => number;
  readonly __wbg_set_texture_width: (a: number, b: number) => void;
  readonly __wbg_get_texture_height: (a: number) => number;
  readonly __wbg_set_texture_height: (a: number, b: number) => void;
  readonly __wbg_world_object_free: (a: number, b: number) => void;
  readonly __wbg_get_world_object_vertice1: (a: number) => number;
  readonly __wbg_set_world_object_vertice1: (a: number, b: number) => void;
  readonly __wbg_get_world_object_vertice2: (a: number) => number;
  readonly __wbg_set_world_object_vertice2: (a: number, b: number) => void;
  readonly __wbg_get_world_object_vertice3: (a: number) => number;
  readonly __wbg_set_world_object_vertice3: (a: number, b: number) => void;
  readonly __wbg_player_free: (a: number, b: number) => void;
  readonly __wbg_get_player_position: (a: number) => number;
  readonly __wbg_set_player_position: (a: number, b: number) => void;
  readonly __wbg_get_player_rotation: (a: number) => number;
  readonly __wbg_set_player_rotation: (a: number, b: number) => void;
  readonly player_new: (a: number, b: number) => number;
  readonly vector3d_new: (a: number, b: number, c: number) => number;
  readonly pixel_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly render_screen: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number, number, number];
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;

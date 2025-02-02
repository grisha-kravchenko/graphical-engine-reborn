let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let WASM_VECTOR_LEN = 0;

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_0.set(idx, obj);
    return idx;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_0.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_0.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}
/**
 * @param {Pixel[]} pixels
 * @param {World_object[]} world
 * @param {Player} player
 * @param {Texture[]} textures
 * @returns {Pixel[]}
 */
export function render_screen(pixels, world, player, textures) {
    const ptr0 = passArrayJsValueToWasm0(pixels, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayJsValueToWasm0(world, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    _assertClass(player, Player);
    var ptr2 = player.__destroy_into_raw();
    const ptr3 = passArrayJsValueToWasm0(textures, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.render_screen(ptr0, len0, ptr1, len1, ptr2, ptr3, len3);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v5 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v5;
}

const ColorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_color_free(ptr >>> 0, 1));

export class Color {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ColorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_color_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get r() {
        const ret = wasm.__wbg_get_color_r(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set r(arg0) {
        wasm.__wbg_set_color_r(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get g() {
        const ret = wasm.__wbg_get_color_g(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set g(arg0) {
        wasm.__wbg_set_color_g(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get b() {
        const ret = wasm.__wbg_get_color_b(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set b(arg0) {
        wasm.__wbg_set_color_b(this.__wbg_ptr, arg0);
    }
}

const PixelFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pixel_free(ptr >>> 0, 1));

export class Pixel {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Pixel.prototype);
        obj.__wbg_ptr = ptr;
        PixelFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof Pixel)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PixelFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pixel_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_pixel_x(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_pixel_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_pixel_y(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_pixel_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get r() {
        const ret = wasm.__wbg_get_pixel_r(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set r(arg0) {
        wasm.__wbg_set_pixel_r(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get g() {
        const ret = wasm.__wbg_get_pixel_g(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set g(arg0) {
        wasm.__wbg_set_pixel_g(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get b() {
        const ret = wasm.__wbg_get_pixel_b(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set b(arg0) {
        wasm.__wbg_set_pixel_b(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    constructor(x, y, r, g, b) {
        const ret = wasm.pixel_new(x, y, r, g, b);
        this.__wbg_ptr = ret >>> 0;
        PixelFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const PlayerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_player_free(ptr >>> 0, 1));

export class Player {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PlayerFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_player_free(ptr, 0);
    }
    /**
     * @returns {Vector3d}
     */
    get position() {
        const ret = wasm.__wbg_get_player_position(this.__wbg_ptr);
        return Vector3d.__wrap(ret);
    }
    /**
     * @param {Vector3d} arg0
     */
    set position(arg0) {
        _assertClass(arg0, Vector3d);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_player_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vector3d}
     */
    get rotation() {
        const ret = wasm.__wbg_get_player_rotation(this.__wbg_ptr);
        return Vector3d.__wrap(ret);
    }
    /**
     * @param {Vector3d} arg0
     */
    set rotation(arg0) {
        _assertClass(arg0, Vector3d);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_player_rotation(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vector3d} position
     * @param {Vector3d} rotation
     */
    constructor(position, rotation) {
        _assertClass(position, Vector3d);
        var ptr0 = position.__destroy_into_raw();
        _assertClass(rotation, Vector3d);
        var ptr1 = rotation.__destroy_into_raw();
        const ret = wasm.player_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        PlayerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TextureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texture_free(ptr >>> 0, 1));

export class Texture {

    static __unwrap(jsValue) {
        if (!(jsValue instanceof Texture)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texture_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get width() {
        const ret = wasm.__wbg_get_texture_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set width(arg0) {
        wasm.__wbg_set_texture_width(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_texture_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_texture_height(this.__wbg_ptr, arg0);
    }
}

const Vector3dFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vector3d_free(ptr >>> 0, 1));

export class Vector3d {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vector3d.prototype);
        obj.__wbg_ptr = ptr;
        Vector3dFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vector3dFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vector3d_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_vector3d_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_vector3d_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_vector3d_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_vector3d_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_vector3d_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_vector3d_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        const ret = wasm.vector3d_new(x, y, z);
        this.__wbg_ptr = ret >>> 0;
        Vector3dFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const World_objectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_world_object_free(ptr >>> 0, 1));

export class World_object {

    static __unwrap(jsValue) {
        if (!(jsValue instanceof World_object)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        World_objectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_object_free(ptr, 0);
    }
    /**
     * @returns {Vector3d}
     */
    get vertice1() {
        const ret = wasm.__wbg_get_world_object_vertice1(this.__wbg_ptr);
        return Vector3d.__wrap(ret);
    }
    /**
     * @param {Vector3d} arg0
     */
    set vertice1(arg0) {
        _assertClass(arg0, Vector3d);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_world_object_vertice1(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vector3d}
     */
    get vertice2() {
        const ret = wasm.__wbg_get_world_object_vertice2(this.__wbg_ptr);
        return Vector3d.__wrap(ret);
    }
    /**
     * @param {Vector3d} arg0
     */
    set vertice2(arg0) {
        _assertClass(arg0, Vector3d);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_world_object_vertice2(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vector3d}
     */
    get vertice3() {
        const ret = wasm.__wbg_get_world_object_vertice3(this.__wbg_ptr);
        return Vector3d.__wrap(ret);
    }
    /**
     * @param {Vector3d} arg0
     */
    set vertice3(arg0) {
        _assertClass(arg0, Vector3d);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_world_object_vertice3(this.__wbg_ptr, ptr0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_pixel_new = function(arg0) {
        const ret = Pixel.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_pixel_unwrap = function(arg0) {
        const ret = Pixel.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_texture_unwrap = function(arg0) {
        const ret = Texture.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_world_object_unwrap = function(arg0) {
        const ret = World_object.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;

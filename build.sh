cd wasm
export RUSTFLAGS="--cfg=web_sys_unstable_apis -C target-feature=+atomics,+bulk-memory"
wasm-pack build --target web --out-dir ../src/frontend/wasm --features parallel -Z build-std=panic_abort,std
cp wasm/pkg/wasm_bg.wasm src/frontend/wasm/
cp wasm/pkg/snippets/* src/frontend/wasm/snippets/
cd ..
npm install
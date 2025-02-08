import { WorldObject, Vector3d } from '../wasm/wasm.js';

const loadWorldObjects = () => {
  const constWorldObjects = [
    {
      vertice1: [0, 0, 100],
      vertice2: [100, 0, 100],
      vertice3: [0, 100, 100],
      texture_id: 0,
    },
  ];
  const worldObjects = new Array(constWorldObjects.length).fill().map((object, index) => {
    return new WorldObject(
      new Vector3d(constWorldObjects[index].vertice1.x, constWorldObjects[index].vertice1.y, constWorldObjects[index].vertice1.z),
      new Vector3d(constWorldObjects[index].vertice2.x, constWorldObjects[index].vertice2.y, constWorldObjects[index].vertice2.z),
      new Vector3d(constWorldObjects[index].vertice3.x, constWorldObjects[index].vertice3.y, constWorldObjects[index].vertice3.z),
      constWorldObjects[index].texture_id
    );
  });

  return worldObjects;
}

export { loadWorldObjects };
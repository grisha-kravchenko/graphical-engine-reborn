import { WorldObject, Vector3d } from '../wasm/wasm.js';

const loadWorldObjects = () => {
  const constWorldObjects = [
    {
      vertice1: [0, 0, 100],
      vertice2: [300, 0, 100],
      vertice3: [0, 150, 100],
      texture_id: 0,
    },
  ];
  const worldObjects = new Array(constWorldObjects.length).fill().map((object, index) => {
    return new WorldObject(
      new Vector3d(constWorldObjects[index].vertice1[0], constWorldObjects[index].vertice1[1], constWorldObjects[index].vertice1[2]),
      new Vector3d(constWorldObjects[index].vertice2[0], constWorldObjects[index].vertice2[1], constWorldObjects[index].vertice2[2]),
      new Vector3d(constWorldObjects[index].vertice3[0], constWorldObjects[index].vertice3[1], constWorldObjects[index].vertice3[2]),
      constWorldObjects[index].texture_id
    );
  });

  return worldObjects;
}

export { loadWorldObjects };
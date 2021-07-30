import { topoSort } from './utils.js';
import systems from './systems/index.js';

// TODO: Topological sort to make sure systems run in the correct order

const entities = [
  { _id: 0, name: 'Player', attack: 1, position: [1, 1], symbol: '@', color: 'white' },
  { _id: 1, name: 'walkable_map', tiles: new Map() },
  { _id: 2, name: 'Goblin', behavior: 'hostile', max_hp: 10, hp: 10, position: [4, 4], symbol: 'g', color: 'lightgreen', blocks_movement: true }
]

window.log = console.log

window.onload = async () => {
  const sys_sorted = topoSort(systems);

  await Promise.all(sys_sorted.map(sys => sys.init && sys.init()))

  let lastTime = performance.now()
  function main(time) {
    const dt = time - lastTime
    lastTime = time;
    sys_sorted.forEach(
      sys => sys.process(entities, dt)
    )

    window.requestAnimationFrame(main)
  }

  main()
}

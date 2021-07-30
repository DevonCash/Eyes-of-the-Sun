import { pt } from '../utils.js';

export default {
  name: 'control',
  async init() {
    this.buffer = []
    window.addEventListener('keydown', (ev) => this.buffer.push(ev))
  },
  predicate: e => e.name === 'Player',
  process(es) {
    const map = es.find(x => 'tiles' in x)
    const p = es.find(this.predicate);

    function moveOrInteract(dx, dy) {
      // Get the position at the end of movement
      const [x, y] = [p.position[0] + dx, p.position[1] + dy];

      const pred = (x, y) => (e) =>
        e !== p
        && (e.position && pt.eq(e.position, [x, y]))
        || (e.destination && pt.eq(e.destination, [x, y]))

      if (map.tiles.get(`${x}:${y}`)) {
        const other = es.find(pred(x, y))
        if (other && other.blocks_movement) { // Something stands in the way!
          if (other.hp) { // That something can be killed!
            log(`You strike viciously at the ${other.name}!`);
            p.target = other;
          } else { // It's a pillar or something
            log(`A ${other.name} blocks your way!`);
          }
        } else {
          p.destination = [x, y];
        }
      } else {
        log(`You can't move there!`);
      }
    }

    for (let { key } of this.buffer) {
      switch (key) {
        case 'w': moveOrInteract(0, -1); break;
        case 's': moveOrInteract(0, 1); break;
        case 'a': moveOrInteract(-1, 0); break;
        case 'd': moveOrInteract(1, 0); break;
      }
    }
    this.buffer = []
  }
}
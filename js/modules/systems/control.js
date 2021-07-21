export default {
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

      if (map.tiles.get(`${x}:${y}`)) {
        const other = es.find(e => e !== p && e.position && e.position[0] === x && e.position[1] === y)
        if (other && other.blocks_movement) { // Something stands in the way!
          if (other.hp) { // That something can be killed!
            log(`You strike viciously at the ${other.name}!`);
            p.target = other;
          } else {
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
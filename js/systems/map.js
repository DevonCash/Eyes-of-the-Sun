export default {
  name: 'map',
  init() { },

  _generate(map) {
    const layout = [
      "###########",
      "#.........#",
      "#...##....#",
      "#.........#",
      "#.........#",
      "#.........#",
      "#....#....#",
      "#.........#",
      "#.........#",
      "#.........#",
      "#.........#",
      "#.........#",
      "###########",
    ]

    for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout[y].length; x++) {
        if (layout[y][x] === '.') map.tiles.set(`${x}:${y}`, true);
      }
    }
  },

  process(es) {
    if (this.sleep) return;
    const map = es.find(e => 'tiles' in e);

    if (map.tiles.size === 0)
      this._generate(map);
    console.log(map)

    this.sleep = true;
  },
  sleep: false,
}
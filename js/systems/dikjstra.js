/*

  # Dijkstra Map System

  Detects changes in the goal tiles of a given dijkstra map, then
  recalculates path values.

  ## Component
  A valid dijkstra map has
    - *tiles* : A Map with a string key and an integer value
    - *isGoal* : 
  

*/

export default {
  name: 'dijkstra',

  _neighbors: (x, y) => [`${x + 1}:${y}`, `${x - 1}:${y}`, `${x}:${y + 1}`, `${x}:${y - 1}`],

  process(es) {
    // Get the dungeon map
    if (!this.walkable_map)
      this.walkable_map = es.find(x => x.name === 'walkable_map');

    // Valid dijkstra map has
    // tiles: A Map with a string key and an integer value
    // isGoal: A function which determines whether a generic entity is a possible source
    //    **NOTE: Entities without positions will automatically be skipped**
    // inverted?: A boolean indicated whether this map indicates flee direction
    for (let e of es) {
      if (!e.tiles || !e.isGoal) continue; // Ensure e is a dijkstra map

      // Get sources and check to see if they've changed, then store new values
      const srcs = es.filter(x => x.position && e.isGoal(x));
      if (e._last && srcs.every((v, i) => e._last[i] === v)) continue;
      _last = srcs;

      // Recalculate Dijkstra Map

      this.walkable_map.forEach(([k]) => e.tiles.set(k, Infinity)); // Clear previous map
      srcs.forEach(({ position }) => e.tiles.set(`${position[0]}:${position[1]}`, 0));// Define goals

      let changes;
      do {
        // Reset changes for this iteration
        changes = 0;

        // For every tile in the dijkstra map
        e.tiles.forEach(([key, val]) => {

          // Find the lowest value in Von Neumann neighborhood
          const lowest_n = Math.min(
            ...this._neighbors(...key.split(':'))
              .map(n => e.tiles.has(n) ? e.tiles.get(n) : Infinity)
          );

          // If this value has changed, set it and increment changes
          if (val !== lowest_n + 1) {
            e.tiles.set(key, lowest_n + 1)
            changes++;
          }
        })

        // Do this until there are no changes
      } while (changes > 0)

    }
  }
}
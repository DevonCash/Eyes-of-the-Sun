export default {
  name: 'combat',
  after: ['ai', 'control'],
  init() { },

  _corpsify: (e) => ({
    _id: e._id,
    position: e.position,
    name: `${e.name} corpse`,
    symbol: '%',
    color: 'red'
  }),

  process(es) {
    for (const e of es) {
      if (!('attack' in e && 'target' in e && e.target.hp)) continue;

      // Alias target for future reference
      const other = e.target;

      // Check if the attack hits
      if (Math.random() > .3) {
        // Attack hits, decrement hit points
        other.hp -= e.attack;
        log(`Hit for ${e.attack} damage!`);
      } else {
        // Attack misses, apply potential penalties
        log(`You swing, but the ${other.name} dodges deftly`)
      }
      // Delete target to finish attack
      delete e.target;

      // Resolve Death
      if (other.hp <= 0) {
        log(`The ${other.name} sinks to the ground, rasping its last breath`)
        const idx = es.indexOf(other);
        if (idx) es[idx] = this._corpsify(other);
      }
    }

  }

}
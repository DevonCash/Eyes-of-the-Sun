export default {

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
      if (!('attack' in e)) continue;
      if (e.target && e.target.hp) {
        const other = e.target;
        if (Math.random() > .3) {
          other.hp -= e.attack;
          log(`Hit for ${e.attack} damage!`);
        } else {
          log(`You swing, but the ${other.name} dodges deftly`)
        }
        delete e.target;

        if (other.hp <= 0) {
          log(`The ${other.name} sinks to the ground, rasping its last breath`)
          const idx = es.indexOf(other);
          if (idx) es[idx] = this._corpsify(other);
        }
      };
    }

  }

}
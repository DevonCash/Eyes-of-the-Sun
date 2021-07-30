export default {
  name: 'ai',
  after: ['control'],
  init() { },
  process(entities, dt) {

    const p = entities.find(x => x.name = 'Player');
    for (let e of entities) {
      if (!('behavior' in e)) continue;

      if (!e.yield || e.yield <= 0) {
        log(`The ${e.name} growls angrily`)
        e.yield = 500
      } else {
        e.yield -= dt;
      }

    }

  }
}
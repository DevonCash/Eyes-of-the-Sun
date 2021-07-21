export default {
  init() { },
  process(entities) {

    const p = entities.find(x => x.name = 'Player');
    for (let e of entities) {
      if (!('behavior' in e)) continue;

      log(`The ${e.name} growls angrily`)

    }

  }
}
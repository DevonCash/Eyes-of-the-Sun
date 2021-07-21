export default {
  init() { },
  predicate: e => e && 'position' in e && 'destination' in e,
  process(es) {
    es.forEach(e => {
      if (!this.predicate(e)) return;
      e.position = e.destination
      delete e.destination
    })
  }
}
export default {
  name: 'display',

  async init(settings) {
    console.log('Initializing Drawing System...')
    this.canvas = document.getElementById('output');
    this.ctx = this.canvas.getContext('2d');

    this.grid_size = 18;

    const resize = () => {
      this.grid_width = Math.floor(this.canvas.parentNode.clientWidth / this.grid_size);
      this.grid_height = Math.floor(this.canvas.parentNode.clientHeight / this.grid_size);

      this.canvas.width = this.grid_width * this.grid_size;
      this.canvas.height = this.grid_height * this.grid_size;
    }
    window.addEventListener('resize', resize);
    resize();

    console.log('Done')
  },

  predicate: (e) => e && 'position' in e && 'symbol' in e,

  _draw(symbol, x, y, color) {
    this.ctx.font = `${this.grid_size}px monospace`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = color;

    this.ctx.fillText(
      symbol,
      (x + .5) * this.grid_size,
      (y + .5) * this.grid_size,
      this.grid_size
    );
  },

  process(es) {
    const { width, height } = this.ctx.canvas
    this.ctx.clearRect(0, 0, width, height);

    const map = es.find(x => 'tiles' in x);
    //    const drawable = es.filter(this.predicate);

    // Construct map of entity by position, draw from top of array to bottom
    const drawable = es.reduce((m, e) => {
      if (this.predicate(e)) {
        const key = `${e.position[0]}:${e.position[1]}`;
        if (!m.get(key)) m.set(key, e)
      }
      return m;
    }, new Map())

    for (let x = 0; x < this.grid_width; x++) {
      for (let y = 0; y < this.grid_height; y++) {
        const e = drawable.get(`${x}:${y}`)
        if (e) this._draw(e.symbol, x, y, e.color || 'white');
        else if (map.tiles.get(`${x}:${y}`)) this._draw('.', x, y, 'gray');
        else this._draw('#', x, y, 'gray');
      }
    }
  },

  sleep: false
}
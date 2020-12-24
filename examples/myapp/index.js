import { createApp } from '../app.js';

const app = createApp({
  node: '#app',
  state: {
    n: 100
  },
  events: {
    'click': function (e) {
      const { n } = this.state;
      this.setState({ n: n + 1 });
    }
  },
  onLoad() {
    this.setState({ n: 1 });
  },
  render() {
    const { n } = this.state;
    return `
      <div>
        <h1>hello - ${n}</h1>
      </div>
    `;
  }
});

app();
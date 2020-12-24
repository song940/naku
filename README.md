## tinyact

> Super Tiny React Alternative

### Installation

```bash
$ npm install tinyact
```

### Example

Live Demo: https://lsong.org/tinyact/examples/todos

```js
import { h, app } from 'tinyact';

app({
  node: '#app',
  state: {
    todos: []
  },
  onInput(e) {
    const { value } = e.target;
    console.log('input', value);
    this.setState({ value });
  },
  addTodo() {
    const { todos, value } = this.state;
    console.log('click', value);
    const todo = { title: value, done: false };
    todos.push(todo);
    this.setState({ todos });
  },
  setStatus(todo) {
    todo.done = !todo.done;
    console.log(todo);
    this.setState({});
  },
  removeTodo(todo) {
    const { todos } = this.state;
    const x = todos.filter(item => item !== todo);
    this.setState({ todos: x });
  },
  render() {
    const { todos } = this.state;
    return h('div', {},
      h('h1', { textContent: 'todo app' }),
      h('input', { oninput: this.onInput.bind(this) }),
      h('button', { textContent: 'add todo', onclick: this.addTodo.bind(this) }),
      h('ul', {},
        todos.map(todo =>
          h('li', {}, [
            h('input', { type: 'checkbox', onchange: this.setStatus.bind(this, todo) }),
            h('span', { className: todo.done ? 'todo-done' : '', textContent: todo.title }),
            h('a', { className: 'todo-remove', onclick: this.removeTodo.bind(this, todo), textContent: 'remove' })
          ]))
      )
    );
  }
});
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---
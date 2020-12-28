import { app, h, span, h1, strong } from '../../dist/tinyact-esm.js';

app({
  node: '#app',
  state: {
    todos: [],
    value: '',
  },
  onInput(e) {
    const { value } = e.target;
    console.log('input', value);
    this.setState({ value });
  },
  handleKeydown(e) {
    if (e.keyCode === 13)
      this.addTodo();
  },
  addTodo() {
    const { todos, value } = this.state;
    console.log('click', value);
    const todo = { title: value, done: false };
    todos.push(todo);
    this.setState({ todos, value: '' });
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
    const { todos, value } = this.state;
    const left = todos.filter(x => !x.done)
    return h('div', {},
      h1({ textContent: 'todos' }),
      h('input', { className: 'new-todo', placeholder: 'What needs to be done?', value, oninput: this.onInput.bind(this), onkeydown: this.handleKeydown.bind(this) }),
      h('ul', { className: "todo-list" },
        todos.map(todo =>
          h('li', { className: `todo ${todo.done ? 'todo-done' : ''}` }, [
            h('input', { className: 'todo-toggle', type: 'checkbox', onchange: this.setStatus.bind(this, todo) }),
            h('label', { className: todo.done ? 'todo-done' : '', textContent: todo.title }),
            h('button', { className: 'todo-destroy', onclick: this.removeTodo.bind(this, todo) })
          ]))
      ),
      h('footer', { className: "footer" }, [
        span({ className: "todo-count" }, [
          strong({ textContent: `${left.length} items left` })
        ])
      ])
    );
  }
});
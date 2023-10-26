import merlin from "https://cdn.jsdelivr.net/gh/marcodpt/merlin/index.min.js"

merlin({
  components: {
    todo: {
      root: document.body.querySelector('main'),
      init: () => ({
        value: "",
        todos: []
      }),
      AddTodo: ({todos, value}) => ({
        todos: todos.concat(value),
        value: ''
      }),
      NewValue: ({todos, value}, ev) => ({
        todos,
        value: ev.target.value
      })
    }
  }
})

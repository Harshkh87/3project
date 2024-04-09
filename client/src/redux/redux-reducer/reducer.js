const initialState = {
  todos: [],
};

// parameter action import from action.js
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // console.log(state)
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload.text }],
      };

    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case 'EDIT_TODO':
      const { index, newText } = action.payload;
      const updatedTodos = state.todos.map((todo, i) =>
        i === index ? { ...todo, text: newText } : todo
      );
      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
};

export default todoReducer;
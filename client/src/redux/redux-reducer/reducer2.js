var initialState = ['JS', 'C#', 'Angular'];

if (localStorage.getItem('todos')) {
  let ls = localStorage.getItem('todos');
  let todosarray = ls.split(',');
  console.log(todosarray);
  initialState = todosarray;
}
//if we have a stored value then we need to load it
//if not -> load the default data

//localStorage.setItem('name', 'Piotr');

function reducer(state = initialState, action) {
  // CONTROLLER:
  if (action.type === 'add') {
    let newState = [...state, action.newTodo];
    localStorage.setItem('todos', newState);
    return newState;
  } else if (action.type === 'remove') {
    return state.filter((todo) => todo !== action.name);
  } else if (action.type === 'edit') {
    console.log('edit');
  } else if (action.type === 'clear') {
    localStorage.setItem('todos', []);
    return [];
  } else if (action.type === 'complete') {
    console.log('complete');
    return state.map((todo) => {
      if (todo === action.name) {
        return '✔ ' + todo;
      } else {
        return todo;
      }
    });
  } else {
    // Default:
    return state;
  }
}

export default reducer;

import { createStore } from 'redux';
import reducer from '../redux-reducer/reducer2';
import { combineReducers } from 'redux';
//const store = combineReducers({list: reducer});

//export const store = createStore(reducer);

const store = createStore(reducer);
export default store;

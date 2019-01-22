import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';


const addOne = (state = 0, action) => {
  return state + 1;
}
const addTwo = (state = 10, action) => {
  return state + 2;
}
export default combineReducers({
  simpleReducer, addOne, addTwo
})
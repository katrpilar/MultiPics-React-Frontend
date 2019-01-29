import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';


const addOne = (state = 0, action) => {
  return state + 1;
}
const addTwo = (state = 10, action) => {
  return state + 2;
}

const setQuery = (state = {query: ''}, action) => {
  console.log(action);
  switch (action.type) {
    case 'UPDATE_QUERY':
     return {query: action.query}
    default:
     return state
   }
};

const setPhotos = (state = {pics: []}, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_PHOTOS':
     return {...state, pics: action.pics}
    default:
     return state
   }
};

export default combineReducers({
  setQuery, setPhotos
})
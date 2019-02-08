import { combineReducers } from "redux";
// import simpleReducer from "./simpleReducer";
// import { getPictures } from "../requests/getPhotos";

// const addOne = (state = 0, action) => {
//   return state + 1;
// };
// const addTwo = (state = 10, action) => {
//   return state + 2;
// };

const setQuery = (state = { query: "" }, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_QUERY":
      return({...state, query: action.query});
    default:
      return state;
  }
};

const setPhotos = (state = { pics: [] }, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_PHOTOS":
      console.log(`Action Pics: ${JSON.stringify(action.pics)}`);
      return({ ...state, pics: action.pics });
    case "ADD_MORE_PHOTOS": {
      const currentPhotos = state.pics;
      return( {...state, pics: [...currentPhotos, ...action.pics]});
    }
    case "REMOVE_PHOTO":
      const currentPhotos = [...state.pics];
      const trimmedPics = currentPhotos.map(
        p => {
          if(p.key !== action.key){
            return p;
          }
        }
      )
      return{ ...state, pics: trimmedPics}
    default:
      return state;
  }
};

// const fetchPhotos = (state = {pics: []}, action) => {
//   console.log(action);
//   switch (action.type) {
//     case 'SET_PHOTOS':
//      return {...state, pics: action.pics}
//     default:
//      return state
//    }
// };

export default combineReducers({
  setQuery,
  setPhotos
});

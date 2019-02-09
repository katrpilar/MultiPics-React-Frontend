import { combineReducers } from "redux";

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
    case "ADD_MORE_PHOTOS": {
      const currentPhotos = state.pics;
      return( {...state, pics: [...currentPhotos, ...action.pics]});
    }
    case "REMOVE_PHOTO":
      const currentPhotos = [...state.pics];
      const trimmedPics = currentPhotos.filter(function(p){
        return p.key != action.key;
        }
      )
      return{ ...state, pics: trimmedPics}
    default:
      return state;
  }
};

export default combineReducers({
  setQuery,
  setPhotos
});

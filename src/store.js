import {createStore, applyMiddleware} from 'redux';  
import rootReducer from './reducers/rootReducer';  
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// const initialState = { 
//   query: '',
//   pics: [] 
// };


export default function configureStore() {  
  return createStore(
    rootReducer,
    // initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
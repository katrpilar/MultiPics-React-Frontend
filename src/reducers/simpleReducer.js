export default (state = {query: ''}, action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
      return { ...state,
       query: action.payload
      }
     default:
      return state
    }
   }
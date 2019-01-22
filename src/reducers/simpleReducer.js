export default (state = '', action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
      return state + action.payload
     default:
      return state
    }
   }
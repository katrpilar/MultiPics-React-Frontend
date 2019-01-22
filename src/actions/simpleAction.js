export const simpleAction = (info) => dispatch => {
    console.log("Payload is:" + info);
    dispatch({
     type: 'SIMPLE_ACTION',
     payload: info
    })
   }
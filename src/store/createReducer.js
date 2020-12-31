/**
 *  Function for conditional call of different actions according to its type
 *  Example of reducerMap: {
      [types.ACTION_TYPE]: (state, action) => {
            perform any operation on the state
            return action.payload.ACTION_PAYLOAD;
        }
    }
 *
 * @param {*} initialState the initial state
 */

const createReducer = initialState => reducerMap => (
  state = initialState,
  action
) => {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
};

export default createReducer;

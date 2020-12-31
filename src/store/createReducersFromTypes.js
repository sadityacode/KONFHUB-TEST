/**
 * `createReducer` to dynamically create a reducer with proper payload
 */
import createReducer from "./createReducer";

/**
 * Util to create a list of reducers based on constants types defined and passed
 *
 * @export as default
 * @param {Object} types - List of constant types used for reducers to combine and map
 * @returns
 */
export default function (types, initialState = {}) {
  const reducerList = {};
  const typeKeys = Object.keys(types);
  typeKeys.forEach(key => {
    const reducer = createReducer(initialState[key] || {})({
      [types[key]]: (state, action) => {
        return {
          ...state,
          ...action.payload
        };
      }
    });
    reducerList[[types[key]]] = reducer;
  });

  return reducerList;
}

/**
 * import all app reducers and export them to combine and integrate in the store
 * !Do not modify the store to combine reducers.
 */
import page from "../page/services/reducer";

let allReducersCombined = {
  ...page
};

export default allReducersCombined;

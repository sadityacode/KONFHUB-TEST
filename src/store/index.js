import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
// TODO: store to be added
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["LAST_LOGGED_IN_TOOL"]
};

const reducerList = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, reducerList);

let store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);
export default function configureStore() {
  return store;
}
export { store, persistor };

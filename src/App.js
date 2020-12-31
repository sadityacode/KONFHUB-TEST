import "./App.css";
import Page from "./page";
import { Provider } from "react-redux";
import { store } from "../src/store";

function App() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}

export default App;

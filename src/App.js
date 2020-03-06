import React from "react";

import "./App.css";
import { Provider } from "react-redux";
import Router from "./app/router";
import configureStore from "./app/redux/store";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;

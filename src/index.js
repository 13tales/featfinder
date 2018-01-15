import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App.js";
import registerServiceWorker from "./registerServiceWorker";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index.js";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { BrowserRouter as Router, Route } from "react-router-dom";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, promiseMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.css';
import 'react-widgets/dist/css/react-widgets.css';
import "./common/layouts/style.css";
import App from "./common/layouts/App";
import ScrollToTop from "../src/common/layouts/ScrollToTop";
import * as serviceWorker from "./serviceWorker";
// import dateFnsLocalizer from 'react-widgets-date-fns';
// @TODO Fix this
// dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "@csstools/normalize.css";
import GlobalStyles from "./GlobalStyles";
import App from "./App";
import { Global } from "@emotion/core";

ReactDOM.render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

import React from "react";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "@csstools/normalize.css";
import GlobalStyles from "./GlobalStyles";
import rootReducer from "./modules";
import App from "./App";
import { Global } from "@emotion/core";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { BrowserRouter } from "react-router-dom";
import decode from "jwt-decode";
import "./typography.css";
// import { refreshToken } from "./lib/api/auth";
import core from "./modules/core";
import apiClient from "./lib/api/apiClient";

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools(),
);

// API 오류로 인해 사용불가
// refreshToken()
//   .then((username) => store.dispatch(core.actions.setUser({ username })))
//   .catch(() => {});

(function () {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const { username } = decode(token);
      apiClient.defaults.headers.common["Authorization"] = token;
      store.dispatch(core.actions.setUser({ username }));
    } catch {
      localStorage.removeItem("accessToken");
    }
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <Helmet>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#2b5797" />
            <meta name="theme-color" content="#ffffff" />
          </Helmet>
          <Global styles={GlobalStyles} />
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./main.scss";
import "./colors.scss";
import "./fadeIn.scss";
import { App } from "./App";
import { store } from "./app/store";

const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

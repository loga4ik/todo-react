import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import App from "./UI/App/App";
import { ThemeContextWrapper } from "./Context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeContextWrapper>
      <App />
    </ThemeContextWrapper>
  </Provider>
);

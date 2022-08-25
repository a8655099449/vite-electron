import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import './samples/node-api'
import "./assets/styles/global.less";
import event from "./common/event";
import BaseContext from "./context/BaseContext";

if (!window.api) {
  window.api = {
    send() {},
    on: event.on as any,
    emit: event.emit,
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseContext>
        <App />
      </BaseContext>
    </BrowserRouter>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");

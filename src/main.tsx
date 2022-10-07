import { ModalsProvider } from "@mantine/modals";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter , HashRouter } from "react-router-dom";
import App from "./App";
// import './samples/node-api'
import "./assets/styles/global.less";
import event from "./common/event";
import ErrorCatch from "./components/Container/ErrorCatch";
import BaseContext from "./context/BaseContext";

if (!window.api) {
  window.api = {
    send() {},
    on: event.on as any,
    emit: event.emit,
    off: event.off as any,
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorCatch>
    <ModalsProvider>
      <HashRouter>
        <BaseContext>
          <App />
        </BaseContext>
      </HashRouter>
    </ModalsProvider>
  </ErrorCatch>
);

postMessage({ payload: "removeLoading" }, "*");

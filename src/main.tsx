import { ModalsProvider } from "@mantine/modals";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
// import './samples/node-api'
import "./assets/styles/global.less";
import event from "./common/event";
import ErrorCatch from "./components/Container/ErrorCatch";
import BaseContext from "./context/BaseContext";

if (!window.api) {
  window.api = {
    send() { },
    on: event.on as any,
    emit: event.emit,
    off: event.off as any,
  };
}

const initEventHandle = () => {

  const isElectron = !!window.serverEvent
  window.api = {
    on(key, listener) {
      event.on(key, listener, null)
    },
    off(key, listener) {
      event.off(key, listener, null)
    },
    emit(key, ...args) {
      (event as any).emit(key, ...args)
    },
    send(key, ...args) {
      if (isElectron) {
        window.serverEvent.send(key, ...args)
      }
    },
  }

}

initEventHandle()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ModalsProvider>
    <HashRouter>
      <BaseContext>
        <App />
      </BaseContext>
    </HashRouter>
  </ModalsProvider>
);

postMessage({ payload: "removeLoading" }, "*");

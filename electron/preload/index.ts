import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  send: (key: string, params = {}) => ipcRenderer.send(key, params),
  on: (eventKey: string, cb = () => {}) => ipcRenderer.on(eventKey, cb),
});

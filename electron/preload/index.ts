import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  send: (key: string, ...args: any[]) => ipcRenderer.send(key, ...args),
  on: (eventKey: string, cb = () => {}) => ipcRenderer.on(eventKey, cb),
});

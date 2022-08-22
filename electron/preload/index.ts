import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  send: (key: string, params = {}) => ipcRenderer.send(key, params),
});

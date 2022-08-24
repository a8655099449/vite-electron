import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  send: (key: string, ...args: any[]) => ipcRenderer.send(key, ...args),
  on: (eventKey: string, cb = () => {}) => ipcRenderer.on(eventKey, cb),
  emit: (key: string, ...args: any) =>
    ipcRenderer.send("EMIT_EVENT", key, ...args),
});

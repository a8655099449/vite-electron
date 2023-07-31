import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("serverEvent", {
  send: (key: string, ...args: any[]) => ipcRenderer.send(key, ...args),
  on: (eventKey: string, cb = () => {}) => ipcRenderer.on(eventKey, cb),
  off: (eventKey: string, cb = () => {}) => {
    ipcRenderer.off(eventKey, cb);
  },
  emit: (key: string, ...args: any) =>
    ipcRenderer.send("EMIT_EVENT", key, ...args),
});

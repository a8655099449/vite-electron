/// <reference types="electron" />

type APISendKeys = keyof [
  "window-min",
  "window-max",
  "window-close",
  "reload",
  "openDevtools"
];

type ListenerKeys = "maximize" | "minimize" | 'unmaximize';

type API = {
  send(key: APISendKeys);
  on(
    key: ListenerKeys,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  );
};

declare var api: API;

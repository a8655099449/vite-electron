/// <reference types="electron" />

type TupleToUnion<T> = T extends [infer P, ...infer K] ? P | TupleToUnion<K> : never

type APISendKeys =  [
  "window-min",
  "window-max",
  "window-close",
  "reload",
  "openDevtools"
];

type ListenerKeys = "maximize" | "minimize" | 'unmaximize';



type API = {
  send(key: TupleToUnion<APISendKeys>);
  on(
    key: ListenerKeys,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  );
};

declare var api: API;

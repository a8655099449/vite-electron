/// <reference types="electron" />

type TupleToUnion<T> = T extends [infer P, ...infer K]
  ? P | TupleToUnion<K>
  : never;
type RouteItem = {
  name: string;
  path: string;
  component?: any;
  icon?: any;
  isMenu?: boolean;
};

type APISendKeys = [
  "window-min",
  "window-max",
  "window-close",
  "reload",
  "toggle-theme",
  "openDevtools"
];

type ListenerKeys = "maximize" | "minimize" | "unmaximize";

declare module "@loadable/component";

type API = {
  send(key: TupleToUnion<APISendKeys>, ...args: any[]);
  on(
    key: ListenerKeys,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  );
};

declare var api: API;

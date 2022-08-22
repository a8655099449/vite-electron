import { BrowserWindow, ipcMain, Menu } from "electron";

export const setMenu = (win: BrowserWindow) => {
  let template = [
    {
      label: "用户",
      submenu: [{ label: "切换用户" }],
    },
    {
      label: "帮助",
      submenu: [
        {
          label: "控制台",
          click: () => {
            win.webContents.openDevTools();
          },
        },
        { label: "关于" },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  // Menu.setApplicationMenu(null);
};

export const openDevToolsByEvent = (win: BrowserWindow) => {
  ipcMain.on("openDevtools", () => {
    win.webContents.openDevTools();
  });
};

const bindEvent = (win: BrowserWindow) => {
  ipcMain.on("reload", () => {
    win.reload()
  });
};

export const initConfig = (win: BrowserWindow) => {
  openDevToolsByEvent(win);
  setMenu(win);
  bindEvent(win)
};

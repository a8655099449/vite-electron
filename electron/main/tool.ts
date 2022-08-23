import { BrowserWindow, ipcMain, Menu, nativeTheme } from "electron";

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

  // Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // Menu.setApplicationMenu(null)
  // Menu.setApplicationMenu(null);
};

export const openDevToolsByEvent = (win: BrowserWindow) => {
  ipcMain.on("openDevtools", () => {
    win.webContents.openDevTools();
  });
  win.setMenu(null);
};

const bindEvent = (win: BrowserWindow) => {
  ipcMain.on("reload", () => {
    win.reload();
  });

  // 最小化窗口
  ipcMain.on("window-min", () => {
    win.minimize();
  });
  // 最大化窗口
  ipcMain.on("window-max", () => {
    // 如果已经是最大化窗口就还原
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
  // 关闭窗口
  ipcMain.on("window-close", () => {
    win.close();
  });
  ipcMain.on("window-close", () => {
    win.close();
  });
  ipcMain.on("toggle-theme", (e , cb) => {
    console.log('toggle-theme',)
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }

    cb?.(nativeTheme.shouldUseDarkColors)

  });

  // 窗口最大化事件
  win.on("maximize", () => {
    win.webContents.send("maximize");
  });
  // 窗口最小化事件
  win.on("unmaximize", () => {
    win.webContents.send("unmaximize");
  });
};

export const initConfig = (win: BrowserWindow) => {
  openDevToolsByEvent(win);
  setMenu(win);
  bindEvent(win);
};

'use strict';
//material-ui

//local
import appProperties from './../resources/properties';

//react

import {app, BrowserWindow, Tray, Menu, shell} from 'electron';
import path from 'path';
import log from 'electron-log';

//dev
require('electron-reload')(__dirname)
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';

//---------------------------------end imports---------------------------------


if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);
const iconPath = path.join(__dirname, './../resources/icon.ico');

console.log("iconPath: ", iconPath);

//devmode stuff
if (isDevMode) {
    log.transports.file.level = 'debug';
    log.transports.console.level = 'verbose';
    log.transports.file.appName = 'Electron';
} else {
    log.transports.file.level = 'info';
    log.transports.console.level = 'info';
}

const lockObtained = app.requestSingleInstanceLock();
app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
        mainWindow.show();
    }
});

if (!lockObtained) {
    app.quit();
}

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        maxWidth: 1440,
        minWidth: 1080,
        maxHeight: 1000,
        frame: false,
            webPreferences: {
            nodeIntegration: true
        }
        
    });




    if (isDevMode) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.setTitle(`Cerebral Update ${appProperties.version}`);
    mainWindow.setMenu(null);

    let trayIcon = new Tray(iconPath);
    trayIcon.setToolTip('Cerebral');
    let contextMenu = Menu.buildFromTemplate([
        {label: 'Show', click: () => {mainWindow.show()}},
        {label: 'Quit', click: () => {
            app.isQuiting = true;
            app.quit()
        }}
    ]);
    trayIcon.setContextMenu(contextMenu);
    trayIcon.on('click', () => {
        mainWindow.show();
    });

    mainWindow.on('minimize', (e) => {
        e.preventDefault();
        mainWindow.hide();
    });
    mainWindow.on('close', (e) => {
        if (!app.isQuiting) {
            e.preventDefault();
            mainWindow.hide();
        }

        return false;
    });
    mainWindow.on('show', () => {
        //sethighilightmode is deprecated as of electron v7
        //trayIcon.setHighlightMode('always')
    });
    mainWindow.on('page-title-updated', (e) => {
        e.preventDefault();
    });
    mainWindow.webContents.on('new-window', function(event, url){
        event.preventDefault();
        shell.openExternal(url);
    });
};

app.on('ready', createWindow);
app.on('activate', () => {
    if (mainWindow === undefined) {
        createWindow();
    }
});
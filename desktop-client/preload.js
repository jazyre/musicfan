const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // We can expose specific functions here for the renderer process to use.
  // For now, we'll leave it empty until we need to communicate with the main process.
});

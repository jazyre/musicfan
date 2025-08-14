// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

// Expose methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Example IPC methods
  sendMessage: (message: string) => ipcRenderer.invoke('send-message', message),
  
  // Add more IPC methods here as needed
});
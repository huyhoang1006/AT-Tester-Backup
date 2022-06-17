const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  login: (user) => ipcRenderer.invoke('login', user),
  signup: (user) => ipcRenderer.invoke('signup', user),
  changePass: (user) => ipcRenderer.invoke('changePass', user),
  getAllUser: () => ipcRenderer.invoke('getAllUser'),
  editUserInfo: (user) => ipcRenderer.invoke('editUserInfo', user),
  addUser: (user) => ipcRenderer.invoke('addUser', user),
  deleteUser: (id) => ipcRenderer.invoke('deleteUser', id),

  getLocations: (userId) => ipcRenderer.invoke('getLocations', userId),
  getLocationById: (id) => ipcRenderer.invoke('getLocationById', id),
  deleteLocation: (ids) => ipcRenderer.invoke('deleteLocation', ids),
  insertLocation: (userId, location) => ipcRenderer.invoke('insertLocation',userId, location),
  updateLocation: (location) => ipcRenderer.invoke('updateLocation', location),

  exportLocationCSV: (data) => ipcRenderer.send('exportLocationCSV', data),
  importLocationCSV: (userId) => ipcRenderer.invoke('importLocationCSV', userId),

  getAssets: (locationId) => ipcRenderer.invoke('getAssets', locationId),
  getAssetById: (id) => ipcRenderer.invoke('getAssetById', id),
  deleteAsset: (id) => ipcRenderer.invoke('deleteAsset', id),
  insertAsset: (locationId, asset) => ipcRenderer.invoke('insertAsset',locationId, asset),
  updateAsset: (asset) => ipcRenderer.invoke('updateAsset', asset),
})
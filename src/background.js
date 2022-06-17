'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import sqlite3 from 'sqlite3'
import path from 'path'
import fs from 'fs'
import { parse } from 'csv-parse';

const db = new sqlite3.Database(__dirname + '/../extraResources/database.db');

const isDevelopment = process.env.NODE_ENV !== 'production'


// const {dialog} = require('@electron/remote')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    show: false,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
      enableRemoteModule: true,
      // nodeIntegration: true
    }
  })

  // full screen
  win.maximize();
  win.show();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
  db.close()
})

app.on('activate',async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) await createWindow()
})

const getUser = (user) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users where username = ? and password = ?", [user.username, user.password], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users ", (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

const changePass = (user) => {
  console.log(user)
  return new Promise((resolve, reject) => {
    db.run('UPDATE users'+
    ' SET password=?'+
    ' WHERE id=?', 
    [user.password,
    user.id], (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}

const checkUserExist = (user) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users where username = ?", [user.username], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}

const insertUser = (user) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users(username, password, role) VALUES(?, ?, ?)', [user.username, user.password, 0], (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}

const insertUserFull = (user) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users(username, password, address, gender, role) VALUES(?, ?, ?, ?, ?)', [user.username, user.password, user.address, user.gender, 0], (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}

const editUserInfo = (user) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE users' +
      ' SET username=?, password=?, address=?, gender=?' +
      ' WHERE id=?',
      [user.username, user.password, user.address, user.gender, user.id], (err) => {
        if (err) reject(err)
        resolve(true)
      })
  })
}

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.get("DELETE FROM users WHERE id = ?", [id], (err,row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}

const getLocations = (userId) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM locations where user_id=?", [userId], (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

const getLocationById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM locations where id = ?", [id], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}

const deleteLocation = (id) => {
  return new Promise((resolve, reject) => {
    db.get("DELETE FROM locations WHERE id = ?", [id], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}

const insertLocation = (userId, location) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO locations(user_id, name, region, division, area, plant, address, city, state_province, postal_code, country, geo_coordinates, location_system_code, person_name, person_phone_no1, person_phone_no2, person_fax_no, person_email, comment, company_company, company_department, company_address, company_city, company_state_province, company_postal_code, company_country, company_phone_no, company_fax_no, company_email)' +
      ' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)',
      [userId,
        location.properties.name, location.properties.region, location.properties.division, location.properties.area, location.properties.plant, location.properties.address, location.properties.city, location.properties.state_province, location.properties.postal_code, location.properties.country, location.properties.geo_coordinates, location.properties.location_system_code,
        location.contact_person.name, location.contact_person.phone_no1, location.contact_person.phone_no2, location.contact_person.fax_no, location.contact_person.email,
        location.comment,
        location.company.company, location.company.department, location.company.address, location.company.city, location.company.state_province, location.company.postal_code, location.company.country, location.company.phone_no, location.company.fax_no, location.company.email], (err) => {
          if (err) reject(err)
          resolve(true)
        })
  })
}

const importLocation = (userId, data) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO locations(user_id, name, region, division, area, plant, address, city, state_province, postal_code, country, person_name, person_phone_no1, person_phone_no2, person_email)' +
      ' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId,
        data.Name, data.Region, data.Division, data.Area, data.Plant, data.Street, data.City, data.State, data.PostalCode, data.Country,
        data.ContactPerson, data.PhoneNumber1, data.PhoneNumber2, data.Email,], (err) => {
          if (err) reject(err)
          resolve(true)
        })
  })
}

const updateLocation = (location) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE locations' +
      ' SET name=?, region=?, division=?, area=?, plant=?, address=?, city=?, state_province=?, postal_code=?, country=?, geo_coordinates=?, location_system_code=?, person_name=?, person_phone_no1=?, person_phone_no2=?, person_fax_no=?, person_email=?, comment=?, company_company=?, company_department=?, company_address=?, company_city=?, company_state_province=?, company_postal_code=?, company_country=?, company_phone_no=?, company_fax_no=?, company_email=?' +
      ' WHERE id=?',
      [location.properties.name, location.properties.region, location.properties.division, location.properties.area, location.properties.plant, location.properties.address, location.properties.city, location.properties.state_province, location.properties.postal_code, location.properties.country, location.properties.geo_coordinates, location.properties.location_system_code,
      location.contact_person.name, location.contact_person.phone_no1, location.contact_person.phone_no2, location.contact_person.fax_no, location.contact_person.email,
      location.comment,
      location.company.company, location.company.department, location.company.address, location.company.city, location.company.state_province, location.company.postal_code, location.company.country, location.company.phone_no, location.company.fax_no, location.company.email,
      location.id], (err) => {
        if (err) reject(err)
        resolve(true)
      })
  })
}

const objectToCsv = (data) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  // Loop to get value of each objects key
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header]
      return `"${val}"`;
    });

    // To add, sepearater between each value
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
}

const csvToObject= (csvData)=>{
  return new Promise((resolve, reject) => {
    parse(csvData, { columns: true }, function (err, data_) {
      if (err)reject(err)
      else {
        var data = JSON.stringify(data_, null, 2);
        var data = JSON.parse(data);
        resolve(data)
      }
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  ipcMain.handle('login', async function (event, user) {
    const _user = await getUser(user)
    if (_user === undefined) return false
    else return _user
  })

  ipcMain.handle('getAllUser', async function (event) {
    const _users = await getAllUser()
    if (_users === undefined) 
      return false
    else return _users
  })

  ipcMain.handle('signup', async function (event, user) {
    const _user = await checkUserExist(user)
    if (_user === undefined) {
      const rs = await insertUser(user)
      if (rs === true) {
        return {
          success: true,
          message: "Success",
        }
      }
    }
    else return {
      success: false,
      message: "User is exist"
    }
  })

  ipcMain.handle('changePass', async function(event, user){
    const rs = await changePass(user)
    if (rs === true){
      return {
        success: true,
        message: "Success"
      }
    }
    else {
      return {
        success: false,
        message: rs
      }
    }
  })

  ipcMain.handle('editUserInfo', async function (event, user) {
    const rs = await editUserInfo(user)
    if (rs === true) {
      return {
        success: true,
        message: "Success"
      }
    }
    else {
      return {
        success: false,
        message: rs
      }
    }
  })

  ipcMain.handle('addUser', async function (event, user) {
    const _user = await checkUserExist(user)
    if (_user === undefined) {
      const rs = await insertUserFull(user)
      if (rs === true) {
        return {
          success: true,
          message: "Success",
        }
      }
    }
    else return {
      success: false,
      message: "User is exist"
    }
  })

  ipcMain.handle('deleteUser', async function (event, id) {
    try {
      await deleteUser(id)
      return {
        success: true,
        message: "",
        data: null
      }
    } catch (error) {
      return {
        success: false,
        message: error,
        data: null
      }
    }
  })

  ipcMain.handle('getLocations', async function (event, userId) {
    try {
      const rows = await getLocations(userId)
      return {
        success: true,
        message: "",
        data: rows
      }
    } catch (error) {
      return {
        success: false,
        message: error,
        data: null
      }
    }
  })

  ipcMain.handle('getLocationById', async function (event, id) {
    try {
      const row = await getLocationById(id)
      return {
        success: true,
        message: "",
        data: row
      }
    } catch (error) {
      return {
        success: false,
        message: error,
        data: null
      }
    }
  })

  ipcMain.handle('deleteLocation', function (event, ids) {
    try {
      ids.forEach(async(id)=> await deleteLocation(id))
      return {
        success: true,
        message: "",
        data: null
      }
    } catch (error) {
      return {
        success: false,
        message: error,
        data: null
      }
    }
  })

  ipcMain.handle('insertLocation', async function (event, userId, location) {
    const rs = await insertLocation(userId, location)
    if (rs === true) {
      return {
        success: true,
        message: "Success"
      }
    }
    else {
      return {
        success: false,
        message: rs
      }
    }
  })

  ipcMain.handle('updateLocation', async function (event, location) {
    const rs = await updateLocation(location)
    if (rs === true) {
      return {
        success: true,
        message: "Success"
      }
    }
    else {
      return {
        success: false,
        message: rs
      }
    }
  })

  ipcMain.on('exportLocationCSV', function (event, data) {
    const csvData = objectToCsv(data);

    dialog.showSaveDialog({
      title: 'Select the file path to save',
      buttonLabel: 'Save',
      filters: [
        { name: 'CSV', extensions: ['csv'] }
      ],
      properties: []
    }).then(file => {
      // Stating whether dialog operation was cancelled or not.
      if (!file.canceled) {
        // Creating and Writing to the sample.txt file
        fs.writeFile(file.filePath.toString(),
          csvData, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
      }
    }).catch(err => {
      console.log(err)
    });
  })

  ipcMain.handle('importLocationCSV', async function (event, userId) {
    const rs = await dialog.showOpenDialog({
      title: 'Select the file to be uploaded',
      buttonLabel: 'Upload',
      filters: [
        {
          name: 'CSV',
          extensions: ['csv']
        },],
      properties: ['openFile']
    })

    if (!rs.canceled){
      const csvData = fs.readFileSync(rs.filePaths[0].toString(), { encoding: 'utf-8' })
      const data = await csvToObject(csvData)
      data.forEach(async (currentValue, index, arr) => {
                await importLocation(userId, currentValue);
              })

      return {
        success: true,
        message: ""
      }
    }
  })

  await createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

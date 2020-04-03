import { draftDataURL as url } from './config';

/** ******************

 DATABASE MANAGEMENT

******************** */

let db;
let dbNamespace;

// SET UP THE DATABASE

function setupDB(namespace, stores) {
  return new Promise(((resolve, reject) => {
    if (namespace !== dbNamespace) {
      db = null;
    }
    dbNamespace = namespace;

    // IF DB EXISTS - RESOLVE
    if (db) {
      resolve();
      return;
    }

    // IF NEW DB - CREATE STORES AND INDEXES
    let dbName = namespace == '' ? 'db' : 'db_' + namespace;
    let dbReq = indexedDB.open(dbName, 1);

    dbReq.onupgradeneeded = (event) => {
      db = event.target.result;
      stores.forEach((store) => {
        if (!db.objectStoreNames.contains(`${store}`)) {
          let objectStore = db.createObjectStore(`${store}`, { autoIncrement: true });
          if (store === 'playerStore') {
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('drafted', 'drafted', { unique: false });
            objectStore.createIndex('roundDrafted', 'roundDrafted', { unique: false });
          }
          if (store === 'managerStore') {
            objectStore.createIndex('managerNum', 'managerNum', { unique: true });
          }
          if (store === 'settingsStore') {
            objectStore.createIndex('rounds', 'rounds', { unique: false });
            objectStore.createIndex('currRound', 'currRound', { unique: false });
            objectStore.createIndex('currManager', 'currManager', { unique: false });
            objectStore.createIndex('numManagers', 'numManagers', { unique: false });
            objectStore.createIndex('id', 'id', { unique: false });
          }
        } else {
          let objectStore = dbReq.transaction.objectStore(`${store}`);
        }
      });
    };

    dbReq.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    dbReq.onerror = (event) => {
      reject(new Error(`err${event.target.errorCode}`));
    };
  }));
}

// GET JSON DATA
async function getPlayerData() {
  const response = await fetch(url);

  return response.json();
}

// RETRIEVE DATA FROM OBJECTSTORE (objectStore, data key, index name)
async function getData(store, ind, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    const index = objectStore.index(`${ind}`);
    const req = index.get(`${data}`);

    req.onsuccess = () => {
      console.log(`${data} retrieved`);
      resolve(req.result);
    };
    req.onerror = (event) => {
      reject(new Error(`error storing ${data} ${event.target.errorCode}`));
    };
  });
}


function cursorData(store, cursorValues) {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    objectStore.openCursor().onsuccess = async (e) => {
      const cursor = e.target.result;
      const cursorArray = [];
      if (cursor) {
        cursorArray.push(cursor.value);
        console.log(cursor);
        cursor.continue();
      } else {
        console.log('All Managers Displayed');
      }
      

    };
    objectStore.onerror = (e) => {

    };
}

// ADD PASSED DATA OR REPORT ERROR
function addData(store, data, item) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    if (data) {
      data.forEach((element) => objectStore.put(element));
    }
    if (item) {
      objectStore.put(item);
    }

    tx.oncomplete = resolve;
    tx.onerror = (event) => {
      reject(new Error(`error storing ${data} ${event.target.errorCode}`));
    };
  });
}

function clearStore(stores) {
  const storeLoop = (store) => {
    let tx = db.transaction([`${store}`], 'readwrite');
    let objectStore = tx.objectStore(`${store}`);
    let req = objectStore.clear();

    req.onsuccess = () => {
      console.log(`${store} cleared`);
    };
    req.onerror = (e) => {
      console.error(new Error(`error clearing store ${e.target.errorCode}`));
    };
  };
  stores.forEach(async (store) => {
    await storeLoop(store);
  });
}

// GET DATA AND ADD DATA
async function main() {
  const players = await getPlayerData();
  const addD = await addData('playerStore', players);
}

// SETUP DB ASYNC CALL
async function setupDraft() {
  const players = await getPlayerData();
  const addD = await addData('playerStore', players);
}


export default { setupDB };
export {
  addData, clearStore, setupDraft, setupDB, getData, cursorData,
};

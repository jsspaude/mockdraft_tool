import { draftDataURL as url } from './config';

/** ******************

 DATABASE MANAGEMENT

******************** */

let db;
let dbNamespace;

// SET UP THE DATABASE

function setupDB(namespace) {
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

      const stores = ['playerStore', 'managerStore', 'settingsStore'];
      // eslint-disable-next-line no-restricted-syntax
      for (const store of stores) {
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
            objectStore.createIndex('numRounds', 'numRounds', { unique: false });
            objectStore.createIndex('currRound', 'currRound', { unique: false });
            objectStore.createIndex('currManager', 'currManager', { unique: false });
            objectStore.createIndex('numManagers', 'numManagers', { unique: false });
            objectStore.createIndex('tracker', 'tracker', { unique: false });
          }
        } else {
          let objectStore = dbReq.transaction.objectStore(`${store}`);
        }
      }
    };

    dbReq.onsuccess = (event) => {
      db = event.target.result;
      resolve();
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

// ADD PASSED DATA OR REPORT ERROR
function addData(store, data, item) {
  return new Promise((resolve, reject) => {
    let tx = db.transaction([`${store}`], 'readwrite');
    let objectStore = tx.objectStore(`${store}`);
    if (data) {
      let req = data.forEach(element => objectStore.put(element));
    }
    if (item) {
      let req = objectStore.put(item);
    }

    tx.oncomplete = resolve;
    tx.onerror = (event) => {
      reject(new Error(`error storing note ${event.target.errorCode}`));
    };
  });
}

// GET DATA AND ADD DATA
async function main() {
  const players = await getPlayerData();
  const addD = await addData('playerStore', players);
}

// SETUP DB ASYNC CALL
export async function startDraft() {
  const setup = await setupDB('mockDraft');
  const getD = await main();
}


export default { startDraft };
export { addData };

import { draftDataURL as url, chunk, isIterable } from './config';

/** ******************
 DATABASE MANAGEMENT
******************** */

let db;
let dbNamespace;

// SET UP THE DATABASE
function dbSetup(namespace, stores) {
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
    const dbName = namespace === '' ? 'db' : `db_${namespace}`;
    const dbReq = indexedDB.open(dbName, 1);

    dbReq.onupgradeneeded = (event) => {
      db = event.target.result;
      stores.forEach((store) => {
        if (!db.objectStoreNames.contains(`${store}`)) {
          const objectStore = db.createObjectStore(`${store}`, { autoIncrement: true });
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
          // eslint-disable-next-line no-unused-vars
          const objectStore = dbReq.transaction.objectStore(`${store}`);
        }
      });
    };
    dbReq.onsuccess = async (event) => {
      db = event.target.result;
      const tx = db.transaction(['settingsStore'], 'readwrite');
      const objectStore = tx.objectStore('settingsStore');
      const ind = objectStore.index('id');
      const requestUpdate = ind.get('tracker');

      requestUpdate.onsuccess = () => {
        let inProgress;
        if (requestUpdate.result === undefined) {
          inProgress = false;
        } else {
          inProgress = true;
        }
        resolve([db, inProgress]);
      };
      requestUpdate.onerror = (event) => {
        console.log('err');
      };
    };
    dbReq.onerror = (event) => {
      reject(new Error(`err${event.target.errorCode}`));
    };
  }));
}

// RETRIEVE DATA FROM OBJECTSTORE USING GET (objectStore, data key, index name)
async function dbGetData(store, index, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    const ind = objectStore.index(`${index}`);
    const req = ind.get(data);

    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = (e) => {
      reject(new Error(`error storing ${data} ${e.target.errorCode}`));
    };
  });
}

// RETRIEVE DATA FROM OBJECTSTORE USING CURSOR (objectStore, keys requested)
function dbGetCursorData(store, keys, primary) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    const cursorArray = [];
    objectStore.openCursor().onsuccess = async (e) => {
      const cursor = e.target.result;
      if (cursor) {
        if (keys !== undefined) {
          keys.forEach((k) => {
            const myobj = {};
            myobj[k] = cursor.value[k];
            cursorArray.push(myobj);
            return myobj;
          });
        }
        if (primary) {
          cursorArray.push({ primaryKey: cursor.primaryKey });
        }
        await cursor.continue();
      } else {
        resolve(cursorArray);
      }
    };
    objectStore.onerror = (e) => {
      reject(console.error(`error with cursor ${store} ${e.target.errorCode}`));
    };
  });
}

// COLLECT CURSOR DATA INTO AN ARRAY
// possible change - look at subing getAll for all of this - perceived workload 5 of 10
async function collectCursorData(store, keys, primary) {
  let cursorDataArray;
  let { length } = keys;
  if (primary) {
    length = keys.length + 1;
  } else;
  await dbGetCursorData(store, keys, primary)
    .then((values) => chunk(values, length))
    .then((array) => { cursorDataArray = array; return cursorDataArray; });
  return cursorDataArray;
}

function dbAddData(store, data, item) {
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

function dbStoreClear(stores) {
  const storeLoop = (store) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    const req = objectStore.clear();

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

// PUT DYNAMIC DRAFT DATA IN STORE
function putData(store, primeKey, keys, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    const request = objectStore.get(parseInt(primeKey, 10));

    request.onerror = () => {
      reject();
    };

    request.onsuccess = async (e) => {
      const data = e.target.result;
      if (store !== 'settingsStore') {
        if (data[keys] === undefined) {
          data[keys] = value;
        } else if (isIterable(data[keys])) {
          const dataArray = [...data[keys], value];
          data[keys] = dataArray;
        } else {
          const dataArray = [data[keys], value];
          data[keys] = dataArray;
        }
      } else {
        data[keys] = value;
      }
      const requestUpdate = objectStore.put(data, parseInt(primeKey, 10));

      requestUpdate.onerror = () => {
        reject();
      };
      requestUpdate.onsuccess = () => {
        resolve(data);
      };
    };
  });
}

// SETUP DB ASYNC CALL
async function dbAddPlayerData() {
  const players = await fetch(url).then((response) => response.json());
  await dbAddData('playerStore', players);
}

export default { dbSetup };
export {
  dbAddData, dbStoreClear, dbAddPlayerData, dbSetup, dbGetData, dbGetCursorData,
  collectCursorData, putData,
};
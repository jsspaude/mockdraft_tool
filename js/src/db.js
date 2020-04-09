import { draftDataURL as url } from './config';

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
    dbReq.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    dbReq.onerror = (event) => {
      reject(new Error(`err${event.target.errorCode}`));
    };
  }));
}

// RETRIEVE DATA FROM OBJECTSTORE USING GET (objectStore, data key, index name)
async function dbGetData(store, ind, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    const index = objectStore.index(`${ind}`);
    const req = index.get(`${data}`);

    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = (e) => {
      reject(new Error(`error storing ${data} ${e.target.errorCode}`));
    };
  });
}

// RETRIEVE DATA FROM OBJECTSTORE USING CURSOR (objectStore, keys requested)
function dbGetCursorData(store, keys) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([`${store}`], 'readwrite');
    const objectStore = tx.objectStore(`${store}`);
    const cursorArray = [];
    objectStore.openCursor().onsuccess = async (e) => {
      const cursor = e.target.result;
      if (cursor) {
        keys.forEach((k, index) => {
          const myobj = {};
          myobj[keys[index]] = cursor.value[k];
          cursorArray.push(myobj);
          return myobj;
        });
        await cursor.continue();
      } else {
        console.log(`All ${store} Items Displayed`);
        resolve(cursorArray);
      }
    };
    objectStore.onerror = (e) => {
      reject(console.error(`error with cursor ${store} ${e.target.errorCode}`));
    };
  });
}

// COLLECT CURSOR DATA INTO AN ARRAY
async function collectCursorData(store, keys) {
  const cursorKeys = keys;
  const cursorDataArray = [];
  await dbGetCursorData(store, cursorKeys)
    .then((values) => {
      values.forEach((value, i) => {
        if ((i - 1) % (cursorKeys.length)) {
          const cursorObject = { ...value, ...values[i + 1] };
          cursorDataArray.push(cursorObject);
        } else;
      });
    });
  return cursorDataArray;
}

// YOU ARE HERE -> trying to use this function below to loop into the function above to output x amounts of ...values

const valuesGenerator = (iterator, objects) => {
  const test = Array(iterator).fill().map((_, i) => i * i);
  const valuesArray = [];
  test.forEach((item, i) => {
    const myObj = { ...objects[i] };
    valuesArray.push(myObj);
  });
  console.log(valuesArray);
};

// .then((object) => {
//   console.log(object);
//   cursorArray.map((v, i) => {
//     const myObj = {};
//     myObj.managerNum = i;
//     myObj.managerName = v;
//     return myObj;
//   });
// });

// ADD PASSED DATA OR REPORT ERROR
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

// SETUP DB ASYNC CALL
async function dbAddPlayerData() {
  const players = await fetch(url).then((response) => response.json());
  await dbAddData('playerStore', players);
}


export default { dbSetup };
export {
  dbAddData, dbStoreClear, dbAddPlayerData, dbSetup, dbGetData, dbGetCursorData, collectCursorData,
};

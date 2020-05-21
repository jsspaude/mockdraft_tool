import { draftDataURL as url } from './config';

export default class IndexedDB {
  constructor(dbName, dbVersion, stores) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.stores = stores;
    this.players = fetch(url)
      .then((request) => request.json())
      .catch((error) => {
        console.log(error);
      });
  }

  getDB() {
    return this.db;
  }

  bindDBChanged(callback) {
    this.DBChanged = callback;
  }

  openDB(callback = (() => {})) {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        callback({ message: 'Unsupported indexedDB' });
      }
      const request = window.indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onerror = (e) => reject(callback(e.target.error));
      request.onupgradeneeded = (e) => {
        this.db = e.target.result;
        this.stores.forEach((o) => {
          const objectStore = this.db.createObjectStore(o.name, o.option);
          if (o.name === 'playerStore') {
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('drafted', 'drafted', { unique: false });
            objectStore.createIndex('roundDrafted', 'roundDrafted', { unique: false });
          }
          if (o.name === 'managerStore') {
            objectStore.createIndex('managerNum', 'managerNum', { unique: true });
          }
          if (o.name === 'settingsStore') {
            objectStore.createIndex('rounds', 'rounds', { unique: false });
            objectStore.createIndex('currRound', 'currRound', { unique: false });
            objectStore.createIndex('currManager', 'currManager', { unique: false });
            objectStore.createIndex('numManagers', 'numManagers', { unique: false });
            objectStore.createIndex('id', 'id', { unique: false });
          }
        });
        this.db.onabort = (e2) => callback(e2.target.error);
        this.db.error = (e2) => callback(e2.target.error);
      };
    });
  }

  getData(store, index, data) {
    return new Promise((resolve, reject) => {
      if (this.db && index) {
        const tx = this.db.transaction([`${store}`], 'readwrite');
        const objectStore = tx.objectStore(`${store}`);
        const ind = objectStore.index(`${index}`);
        const req = ind.get(data);

        req.onsuccess = () => {
          resolve(req.result);
        };
        req.onerror = (e) => {
          reject(new Error(`error storing ${data} ${e.target.errorCode}`));
        };
      }
    });
  }

  getKey(store, key, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([`${store}`], 'readwrite');
      const objectStore = tx.objectStore(`${store}`);
      const req = objectStore.getKey(key);
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = (e) => {
        reject(new Error(`error storing ${data} ${e.target.errorCode}`));
      };
    });
  }

  getAllData(store) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const tx = this.db.transaction([`${store}`], 'readwrite');
        const objectStore = tx.objectStore(`${store}`);
        const req = objectStore.getAll();
        req.onsuccess = async () => {
          const arr1 = await req.result;
          const reqUpdate = objectStore.getAllKeys();
          reqUpdate.onsuccess = () => {
            const arr2 = reqUpdate.result;
            const newObj = arr1.map((item, index) => {
              const data = item;
              data.primaryKey = arr2[index];
              return newObj;
            });
            resolve(req.result);
          };
        };
        req.onerror = () => {
          reject();
        };
      }
    });
  }

  getAllKeys(store) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const tx = this.db.transaction([`${store}`], 'readwrite');
        const objectStore = tx.objectStore(`${store}`);
        const req = objectStore.getAllKeys();
        req.onsuccess = () => {
          resolve(req.result);
        };
        req.onerror = () => {
          reject();
        };
      }
    });
  }

  getByPrimary(store, primary) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([`${store}`], 'readwrite');
      const objectStore = tx.objectStore(`${store}`);
      objectStore.openCursor().onsuccess = async (e) => {
        const cursor = e.target.result;
        if (cursor.primaryKey === primary) {
          resolve(cursor.value);
        } else {
          await cursor.continue();
        }
      };
      objectStore.onerror = () => {
        reject();
      };
    });
  }

  getCursorData(store, keys, primary) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([`${store}`], 'readwrite');
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
      objectStore.onerror = () => {
        reject();
      };
    });
  }

  addData(store, data, item) {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const tx = this.db.transaction([`${store}`], 'readwrite');
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
      }
    });
  }

  // PUT DYNAMIC DRAFT DATA IN STORE
  putData(store, primeKey, keys, value) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([`${store}`], 'readwrite');
      const objectStore = tx.objectStore(`${store}`);
      const request = objectStore.get(parseInt(primeKey, 10));
      request.onerror = () => {
        reject();
      };

      request.onsuccess = async () => {
        const data = request.result;
        if (store !== 'settingsStore') {
          if (data[keys] === undefined) {
            data[keys] = value;
          } else if (data[keys].length) {
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

  storeClear(stores) {
    const storeLoop = (store) => {
      const tx = this.db.transaction([`${store}`], 'readwrite');
      const objectStore = tx.objectStore(`${store}`);
      const req = objectStore.clear();

      req.onsuccess = () => {
        console.log(`${store} cleared`);
      };
    };
    stores.forEach(async (store) => {
      await storeLoop(store);
    });
  }
}

export { IndexedDB };

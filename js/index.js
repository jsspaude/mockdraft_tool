const playerTable = document.querySelector('[data-js="playerTable"]');
const managerContainer = document.querySelector('[data-js="managerContainer"]');
const managerInputContainer = document.querySelector('[data-js="managerInputContainer"]');
const settings = document.querySelector('[data-js="settings"]');
const namesButton = settings.querySelector('[data-js="manNameBtn"]');
const resetButton = settings.querySelector('[data-js="resetBtn"]');
const positions = ['qb', 'rb', 'rb', 'wr', 'wr', 'te', 'flex', 'dst', 'k'];
const roundTracker = document.querySelector('[data-js="roundTracker"]');
const managerTracker = document.querySelector('[data-js="managerTracker"]');
const numRounds = settings.querySelector('[data-js="numRounds"]');
const formStart = document.querySelector('[data-js="startDraft"]');
let managerCount;
let managerInput;
let currManager;
let currRound;
let db;
let players;
let rounds;

// IMPORT JSON
function addPlayerData(db) {
  const tx = db.transaction('playerStore', 'readwrite');
  fetch('./js/draft_data.json')
    .then((response) => response.json())
    .then((data) => data.reduce((prev, d) => prev.then(() => tx.store.add({ d }), Promise.resolve())))
    .catch((err) => {
      console.log(err);
    });
}
// START DB
window.onload = function () {
  const DBOpenRequest = window.indexedDB.open('mockDraft', 1);
  DBOpenRequest.onerror = function () {
    // console.log('MockDraft Failed to Open');
  };
  DBOpenRequest.onsuccess = function () {
    // console.log('MockDraft Data Inputted');
    db = DBOpenRequest.result;
  };
  DBOpenRequest.onupgradeneeded = function (e) {
    db = e.target.result;
    const playerStore = db.createObjectStore('playerStore', { keyPath: 'id', autoIncrement: true });
    const managerStore = db.createObjectStore('managerStore', { keyPath: 'id', autoIncrement: true });
    const settingsStore = db.createObjectStore('settingsStore', { keyPath: 'id', autoIncrement: true });
    playerStore.createIndex('name', 'name', { unique: false });
    playerStore.createIndex('drafted', 'drafted', { unique: false });
    playerStore.createIndex('roundDrafted', 'roundDrafted', { unique: false });
    playerStore.createIndex('manager', 'manager', { unique: false });
    settingsStore.createIndex('numRounds', 'numRounds', { unique: false });
    settingsStore.createIndex('currRound', 'currRound', { unique: false });
    settingsStore.createIndex('currManager', 'currManager', { unique: false });
    settingsStore.createIndex('numManagers', 'numManagers', { unique: false });
    settingsStore.createIndex('tracker', 'tracker', { unique: false });
    managerStore.createIndex('managerNum', 'managerNum', { unique: true });
    // console.log('MockDraft Stores Added');
  };
  // STORE USER SETTINGS CALL
  namesButton.addEventListener('click', initSettings);
  // CLEAR ALL DATA ON RESET CALL
  resetButton.addEventListener('click', () => {
    clearDisplay();
  });
  // ADD PLAYER DATA + CREATE INDEXES CALL
  formStart.onsubmit = addData;

  function initSettings() { // STORE USER SETTINGS
    managerCount = settings.querySelector('select').value;

    for (let i = 0; i < managerCount; i++) {
      const managerName = document.createElement('input');
      managerInputContainer.appendChild(managerName);
      managerName.setAttribute('placeholder', `Manager ${i}`);
      managerName.setAttribute('data-manager', i);
      managerName.setAttribute('data-js', 'managerName');
    }

    managerInput = document.querySelectorAll('[data-js="managerName"]');
  }

  // const objectStoreVars = (storeName, storeIndex, value) => {
  //     let transaction = db.transaction([`${storeName}`]),
  //         objectStore = transaction.objectStore(`${storeName}`);
  //         console.log(transaction,objectStore);
  //         return transaction, objectStore;
  // }

  // objectStoreVars('playerStore');
  // ADD PLAYER DATA + CREATE INDEXES
  function addData(e) {
    e.preventDefault();

    const playerTransaction = db.transaction(['playerStore'], 'readwrite');
    const managerTransaction = db.transaction(['managerStore'], 'readwrite');
    const settingsTransaction = db.transaction(['settingsStore'], 'readwrite');
    const playerStore = playerTransaction.objectStore('playerStore');
    const managerStore = managerTransaction.objectStore('managerStore');
    const settingsStore = settingsTransaction.objectStore('settingsStore');
    const newItem = {
      numRounds: numRounds.value, currRound: 1, currManager: 0, numManagers: managerCount, tracker: 0,
    };
    settingsRequest = settingsStore.add(newItem);

    for (const value of players) {
      playerStore.add(value);
    }

    for (const [i, value] of managerInput.entries()) {
      const newItem = {
        managerName: value.value, managerNum: i, playerName: [], playerPos: [], playerTeam: [],
      };
      managerStore.add(newItem);
    }

    playerStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        const updatePlayer = cursor.value;
        updatePlayer.manager = 99,
        updatePlayer.drafted = 0,
        updatePlayer.roundDrafted = 0;

        cursor.update(updatePlayer);
        cursor.continue();
      } else {
        // console.log('Init Player Data Displayed');
      }
    };

    playerTransaction.oncomplete = function () {
      // console.log('Data Stores Updated');
      asyncDisplay();
    };
  }
  // DISPLAY PLAYER DATA
  const displayPlayers = async () => {
    const transaction = db.transaction(['playerStore'], 'readwrite');
    const playerStore = transaction.objectStore('playerStore');


    playerStore.openCursor().onsuccess = await function (e) {
      const cursor = e.target.result;
      if (cursor) {
        const tableRow = document.createElement('tr');
        const updatePlayer = cursor.value;
        markup = `<tr data-playerKey=${cursor.value.id} data-manager=${cursor.value.manager}>
                            <td>${cursor.value.adp}</td>
                            <td>${cursor.value.name}</td>
                            <td>${cursor.value.pos}</td>
                            <td>${cursor.value.team}</td>
                            <button data-playerKey=${cursor.value.id} data-manager=${cursor.value.manager} data-js='draftBtn'>DRAFT</button>
                        </tr>`;
        const draftBtn = [...document.querySelectorAll('[data-js="draftBtn"]')];

        cursor.update(updatePlayer);
        tableRow.innerHTML = markup;
        playerTable.appendChild(tableRow);
        cursor.continue();
        draftBtn.forEach((item) => item.addEventListener('click', throttle(draftPlayer, 1000)));
      } else {
        // console.log('Player Data Displayed');
      }
    };
  };

  const displayManagers = () => { // DISPLAY MANAGER DATA
    const managerStore = db.transaction('managerStore').objectStore('managerStore');
    console.log('test');
    managerStore.openCursor().onsuccess = async (e) => {
      const cursor = e.target.result;
      if (cursor) {
        console.log('test');
        const article = document.createElement('article');
        const table = document.createElement('table');
        const managerData = document.createElement('th');
        const appendTable = async () => {
          article.appendChild(table);
          table.appendChild(managerData);
          document.querySelector('[data-js="managerContainer"]').appendChild(article);
          table.setAttribute('data-manager', cursor.value.managerNum);
        };

        appendTable();
        await addRows(table, cursor.value);
        await displayNames(cursor.value, managerData);
        cursor.continue();
      } else {
        // console.log('Managers Displayed');
      }
    };
  };

  const displayInfo = () => { // DISPLAY GLOBAL DATA
    const settingsTransaction = db.transaction(['settingsStore'], 'readwrite');
    const settingsStore = settingsTransaction.objectStore('settingsStore');
    const settingsTrackerIndex = settingsStore.index('tracker');
    const settingsRequest = settingsTrackerIndex.get(0);

    settingsRequest.onsuccess = (e) => {
      const data = e.target.result;
      currRound = data.currRound;
      currManager = data.currManager;
      roundTracker.innerText = currRound;

      const managerTransaction = db.transaction(['managerStore'], 'readwrite');
      const managerStore = managerTransaction.objectStore('managerStore');
      const managerNumIndex = managerStore.index('managerNum');
      const managerRequest = managerNumIndex.get(currManager);
      let currName;

      rounds = parseInt(data.numRounds);
      managerRequest.onerror = (e) => {
        // console.log('Manager Tracker Update Error');
      };

      managerRequest.onsuccess = (e) => {
        const data = e.target.result;
        currName = data.managerName;
        if (currName === '') {
          managerTracker.innerText = `Manager ${currManager}`;
        } else {
          managerTracker.innerText = currName;
        }
      };
    };
  };

  const clearData = () => { // CLEAR ALL STORES
    const managerTransaction = db.transaction(['managerStore'], 'readwrite');
    const playerTransaction = db.transaction(['playerStore'], 'readwrite');
    const settingsTransaction = db.transaction(['settingsStore'], 'readwrite');
    const managerStore = managerTransaction.objectStore('managerStore');
    const playerStore = playerTransaction.objectStore('playerStore');
    const settingsStore = settingsTransaction.objectStore('settingsStore');

    managerRequest = managerStore.clear();
    playerRequest = playerStore.clear();
    settingsRequest = settingsStore.clear();
    playerTable.innerHTML = '';
    managerContainer.innerHTML = '';
    managerInputContainer.innerHTML = '';
    managerTracker.innerHTML = '';
    roundTracker.innerHTML = '';
  };

  const draftPlayer = (draftBtn) => { // UPDATE DATA ON DRAFT BUTTON CLICK
    const playerTransaction = db.transaction(['playerStore'], 'readwrite');
    const playerStore = playerTransaction.objectStore('playerStore');
    const playerKey = draftBtn.target.getAttribute('data-playerkey');
    const playerRequest = playerStore.get(playerKey);
    let playerName;
    let playerPos;

    playerRequest.onerror = (e) => {
      // console.log('Draft Button Error')
    };
    playerRequest.onsuccess = async (e) => {
      const data = e.target.result;
      managerTransaction = db.transaction(['managerStore'], 'readwrite'),
      managerStore = managerTransaction.objectStore('managerStore'),
      managerIndex = managerStore.index('managerNum'),
      console.log(currManager);
      managerRequest = managerIndex.get(currManager),
      settingsTransaction = db.transaction(['settingsStore'], 'readwrite'),
      settingsStore = settingsTransaction.objectStore('settingsStore'),
      settingsTrackerIndex = settingsStore.index('tracker'),
      settingsRequest = settingsTrackerIndex.get(0);

      playerName = data.name;
      playerPos = data.pos;
      data.manager = currManager;
      data.drafted = 1;
      data.roundDrafted = currRound;

      const requestUpdate = playerStore.put(data);
      requestUpdate.onerror = (e) => {
        // console.log('Manager Change Error')
      };
      requestUpdate.onsuccess = (e) => {
        // console.log('Draft Player Success');
        document.querySelector('[data-js="playerTracker"]').innerText = `${currManager.innerText} drafted ${d.name}`;
      };
      await updateManagerArrays(managerRequest, managerStore);
      await updateSettings(settingsRequest, settingsStore);
      await displayDrafted();
    };
  };

  function displayDrafted() {
    const managerTransaction = db.transaction(['managerStore'], 'readwrite');
    const managerStore = managerTransaction.objectStore('managerStore');

    managerStore.openCursor().onsuccess = async (e) => {
      const cursor = e.target.result;

      if (cursor) {
        const td = document.querySelectorAll('[data-pos][data-manager]');
        const position = cursor.value.playerPos;

        cursor.continue();
      } else {
        // console.log('Managers Displayed');
      }
    };

    // for(const [i,value] of td.entries()){
    //     console.log(value);
    //     if(value[i].innerText === ""){
    //         td.innerHTML = playerName;
    //         break;
    //     }
    // }
  }

  const updateSettings = (request, objectStore) => {
    request.onerror = (e) => {
      // console.log('Manager Tracker Error');
    };
    request.onsuccess = (e) => {
      const data = e.target.result;
      const numManagers = parseInt(data.numManagers) - 1;
      let requestUpdate;

      if ((data.currManager === numManagers) || (data.currManager === 0) && (data.currRound !== 1)) {
        data.currRound = data.currRound += 1;
      }
      if (isEven(data.currRound)) {
        data.currManager = data.currManager -= 1;
        requestUpdate = objectStore.put(data);
      } else {
        data.currManager = data.currManager += 1;
        requestUpdate = objectStore.put(data);
      }
      requestUpdate.onerror = (e) => {
        // console.log('Manager Tracker Error')
      };
      requestUpdate.onsuccess = (e) => {
        asyncDraft();
      };
    };
  };

  const updateManagerArrays = (request, objectStore) => {
    request.onerror = (e) => {
      // console.log('Draft Player managerRequest Error');
    };

    request.onsuccess = (e) => {
      const data = e.target.result;
      data.playerName.push(playerName);
      data.playerPos.push(playerPos.toLowerCase());

      const requestUpdate = objectStore.put(data);

      requestUpdate.onerror = (e) => {
        console.log('Draft Player Manager Request Update Success');
      };
      requestUpdate.onsuccess = (e) => {
        console.log('Draft Player Manager Request Update Success');
      };
    };
  };

  const asyncDisplay = async () => { // DISPLAY PLAYERS AND MANAGER AFTER GLOBALS RUN
    const info = displayInfo();
    const players = await displayPlayers();
    const managers = await displayManagers();
    const drafted = await displayDrafted();
  };

  const asyncDraft = async () => { // DISPLAY PLAYERS AND MANAGER AFTER GLOBALS RUN
    const info = displayInfo();
    const players = await displayPlayers();
  };

  const clearDisplay = async () => { // CLEAR STORES THEN RESET DISPLAY
    const clear = clearData();
    const display = await asyncDisplay();
  };

  function getPlayerVariables(d, store) {

  }

  const isEven = (value) => { // HELPER FOR ROUND TRACKING
    if (value % 2 == 0) return true;
    return false;
  };

  const displayNames = (value, element) => { // TO DO - MOVE FUNCTION TO HELPER FUNCTIONS PASS cursor.value as (value)
    if (value.managerName == '') {
      element.innerText = `Manager ${value.managerNum}`;
    } else {
      element.innerText = value.managerName;
    }
  };

  const addRows = (parent, value) => {
    for (let i = 0; i < rounds; i++) {
      const draftRow = document.createElement('tr');
      parent.appendChild(draftRow);

      for (let i = 0; i < 2; i++) {
        draftData = document.createElement('td');
        draftRow.appendChild(draftData);
        draftData.setAttribute('data-td', i);
      }

      if (i > 8) {
        draftRow.firstChild.innerText = 'BENCH';
        draftData.parentElement.children[1].setAttribute('data-pos', 'bench');
        draftData.parentElement.children[1].setAttribute('data-manager', value.managerNum);
      } else {
        draftRow.firstElementChild.innerText = positions[i].toUpperCase();
        draftData.parentElement.children[1].setAttribute('data-pos', positions[i]);
        draftData.parentElement.children[1].setAttribute('data-manager', value.managerNum);
      }
    }
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
};


// TO DO - NOTES: If new round start manager back at 0 or end depending on round (snake)

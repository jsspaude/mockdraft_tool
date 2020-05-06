import regeneratorRuntime from 'regenerator-runtime';

import {
  dbAddPlayerData, dbStoreClear, dbSetup, dbAddData, dbGetData, dbPutData, collectCursorData,
  dbGetCursorData,
} from './src/db';

import { draftDataURL as url, objectStores, catObjects, groupBy } from './src/config';
import { displayMarkup } from './src/view';
import { View } from './src/view2';
import { IndexedDB } from './src/model';

// VARIABLES
// let currSettings;
let userValues = [];
let db;

// PULL USER VALUE INPUTS
const getUserValues = () => {
  const [managerCount, rounds] = [
    parseInt(document.querySelector('[data-js="numManagers"]').value, 10),
    parseInt(document.querySelector('[data-js="numRounds"]').value, 10),
  ];
  return { managerCount, rounds };
};

// CREATE TEXT INPUTS
function createManagerInputs() {
  return new Promise((resolve) => {
    const mc = getUserValues().managerCount;
    const managerInput = Array.from(Array(mc)).map((_, i) => i);
    const managerInputs = [];
    managerInput.forEach((manager, i) => {
      const nameInput = document.createElement('input');
      const managerName = document.querySelector('[data-js="managerInputContainer"]').appendChild(nameInput);
      managerName.setAttribute('placeholder', `Manager ${i}`);
      managerName.setAttribute('data-manager', i);
      managerName.setAttribute('data-js', 'managerInput');
      managerInputs.push(nameInput);
    });
    resolve(managerInputs);
  });
}

// RUN FUNCTIONS:
// create text inputs based on user selections, then store that data
async function storeUserSettings() {
  const getValues = await getUserValues();
  const manInputs = await createManagerInputs();
  await dbAddData('settingsStore', '', {
    ...getValues, id: 'tracker', currManager: 0, currRound: 0,
  });
  await dbGetData('settingsStore', 'id', 'tracker');
  return [manInputs, getValues];
}


// ON STARTDRAFT FORM SUBMIT:
// retrieve user inputs and store them in manager store.
async function storeTextInputs() {
  const inputs = [...document.querySelectorAll('[data-js="managerInput"]')];
  const managerInputData = Array.from([...inputs.map((v) => v.value)], (item, i) => item || `Manager ${i}`);
  const managerStoreData = managerInputData.map((v, i) => {
    const myObj = {};
    myObj.managerNum = i;
    myObj.managerName = v;
    return myObj;
  });
  await dbAddData('managerStore', managerStoreData);
}

// CHANGE PLAYER MANAGER DATA
function updatePlayerData(player) {
  const draftedData = {
    name: player.dataset.name,
    pos: player.dataset.pos,
    team: player.dataset.team,
  };
  const primary = player.dataset.key;

  dbPutData('playerStore', parseInt(primary, 10), 'manager', currSettings.currManager);
  return draftedData;
}

async function currSettingsTracking() {
  currSettings.currManager += 1;
  await dbPutData('settingsStore', currSettings.primaryKey, 'currManager', currSettings.currManager);
}

async function draftPutDisplay(key, object) {
  const container = document.querySelector(`article[data-manager="${currSettings.currManager}"]`);
  await dbPutData('managerStore', key, 'players', object)
    .then((data) => {
      const d = data;
      const positionGroup = groupBy(data.players, 'pos');
      d.players = positionGroup;
      return d;
    })
    .then((result) => {
      const newDisplay = displayMarkup(result, 'manager', document.querySelector('[data-js="managerContainer"]')); 
      container.innerHTML = newDisplay;
      currSettingsTracking();
    });
}

// ADD CLICK EVENT TO DRAFT BUTTONS THEN PERFORM DRAFTING ACTIONS:
function activateDraftButtons() {
  const playerTable = document.querySelector('[data-js="playerTable"]');
  playerTable.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
      const storedPlayerData = updatePlayerData(e.target, currSettings.currManager);
      const primary = await dbGetCursorData('managerStore', undefined, true);
      draftPutDisplay(primary[currSettings.currManager].primaryKey, storedPlayerData);
    }
    e.stopPropagation();
  }, false);
}


// COLLECT DATA FROM DB INTO ARRAYS AND DISPLAY
async function collectAndDisplayData(init) {
  await collectCursorData('playerStore', ['manager', 'adp', 'name', 'pos', 'team'], 'true').then((result) => {
    result.forEach((object) => {
      const data = catObjects(object);
      displayMarkup(data, 'players', document.querySelector('[data-js="playerTable"]'), init);
    });
  });
  await collectCursorData('settingsStore', ['currManager', 'currRound', 'rounds', 'managerCount'], 'true').then((result) => {
    let data;
    result.forEach((object) => {
      data = catObjects(object);
      displayMarkup(data, 'settings', document.querySelector('[data-js="settingsContainer"]'), init);
    });
    currSettings = data;
    return data;
  });
  await collectCursorData('managerStore', ['managerNum', 'managerName', 'players'], 'true').then((result) => {
    result.forEach((object) => {
      const data = catObjects(object);
      if (data.players !== undefined) {
        const positionGroup = groupBy(data.players, 'pos');
        data.players = positionGroup;
      }
      displayMarkup(data, 'manager', document.querySelector('[data-js="managerContainer"]'), init);
    });
  });
}

// SETUP DB:
// on load setupDB, if settingsStore has data then display draft data

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindInputs(this.handleInputs);
    this.view.bindReset(this.handleReset);
    this.view.bindStart(this.handleStart);
    this.view.bindDraft(this.handleDraft);
  }

  async init() {
    await this.model.openDB();
    await this.model.getAllData('playerStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'players', document.querySelector('[data-js="playerTable"]'), true);
        });
      });
    await this.model.getAllData('managerStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'manager', document.querySelector('[data-js="managerContainer"]'), true);
        });
      });
    await this.model.getAllData('settingsStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'settings', document.querySelector('[data-js="settingsContainer"]'), true);
        });
      });
  }

  handleInputs = (data) => {
    const newObj = {
      numManagers: data[0], rounds: data[1], currManager: 0, currRound: 0,
    };
    this.model.addData('settingsStore', undefined, newObj);
  }

  handleStart = async (data) => {
    await this.model.players.then((request) => {
      this.model.addData('playerStore', request, undefined);
    });
    this.model.getAllData('playerStore').then((request) => {
      request.forEach((item) => {
        this.view.displayMarkup(item, 'players', document.querySelector('[data-js="playerTable"]'), true);
      });
    });
    await this.model.addData('managerStore', data);
    await this.model.getAllData('managerStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'manager', document.querySelector('[data-js="managerContainer"]'), true);
        });
      });
    await this.model.getAllData('settingsStore')
      .then((request) => {
        request.forEach((item) => {
          this.view.displayMarkup(item, 'settings', document.querySelector('[data-js="settingsContainer"]'), true);
        });
      });
  }

  handleReset = () => {
    this.model.storeClear(['playerStore', 'managerStore', 'settingsStore']);
  }

  handleDraft = async (data) => {
    console.log(data);
    const primary = await data.key;
    await this.model.getAllData('settingsStore').then(async (request) => {
      const prime = await request[0].primaryKey;
      const { currManager } = await request[0];
      const container = document.querySelector(`article[data-manager="${currManager}"]`);
      const primes = await this.model.getCursorData('managerStore', undefined, true);
      this.model.putData('playerStore', parseInt(primary, 10), 'manager', currManager);
      await this.model.putData('settingsStore', parseInt(prime, 10), 'currManager', (currManager + 1));
      this.model.putData('managerStore', primes[currManager].primaryKey, 'players', 'test')
        .then((stuff) => {
          // const d = data;
          // const positionGroup = groupBy(data.players, 'pos');
          // d.players = positionGroup;
          // return d;
        });
        // .then((result) => {
        //   const newDisplay = displayMarkup(result, 'manager', document.querySelector('[data-js="managerContainer"]')); 
        //   container.innerHTML = newDisplay;
        // });
    });
  }
}

window.onload = () => {
  const app = new Controller(new IndexedDB('mock', 1, objectStores), new View()).init();
};

// window.onload = async () => {
//   // await dbSetup('mockDraft', stores)
//   //   .then((x) => {
//   //     [db] = x;
//   //     if (x[1]) {
//   //       collectAndDisplayData(true);
//   //       activateDraftButtons();
//   //     }
//   //   });
//   const players = await fetch(url).then((response) => response.json());
//   const newDB = new IndexedDB('mock', 1, [{ name: 'playerStore', option: { autoIncrement: true } }, { name: 'managerStore', option: { autoIncrement: true } }, { name: 'settingsStore', option: { autoIncrement: true } }]);
//   await newDB.openDB();
//   await newDB.addData('playerStore', players);
//   await newDB.getAllData('playerStore');
//   collectAndDisplayData(true);
//   activateDraftButtons();

//   // APPLY USER SETTINGS
//   buttons.settingsForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     await storeUserSettings(newDB.getDB).then((x) => { userValues = x; });
//     await dbAddPlayerData();
//   });

//   // RESET APP - clear stores and inputs, etc
//   buttons.resetButton.addEventListener('click', () => {
//     dbStoreClear(stores);
//     buttons.settingsForm.reset();
//     userValues[0].forEach((value) => { value.parentNode.removeChild(value); });
//   });

//   // START APP
//   buttons.startForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     await storeTextInputs(newDB.getDB);
//     await collectAndDisplayData(true);
//     activateDraftButtons();
//   });
// };


// // GOAL const app = new Controller(new Model(), new View())


// NEED TO DO: change manager and round on draft click, display drafted

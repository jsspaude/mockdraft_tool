import regeneratorRuntime from 'regenerator-runtime';

import {
  dbAddPlayerData, dbStoreClear, dbSetup, dbAddData, dbGetData, putData, collectCursorData,
  dbGetCursorData,
} from './src/db';
import { stores, catObjects, groupBy } from './src/config';
import { displayMarkup } from './src/view';

// VARIABLES
const settingsForm = document.querySelector('[data-js="settingsForm"]');
const resetButton = document.querySelector('[data-js="resetBtn"');
const startForm = document.querySelector('[data-js="startDraft"');
let currSettings;
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

  putData('playerStore', parseInt(primary, 10), 'manager', currSettings.currManager);
  return draftedData;
}

async function currSettingsTracking() {
  currSettings.currManager += 1;
  await putData('settingsStore', currSettings.primaryKey, 'currManager', currSettings.currManager);
}

async function draftPutDisplay(key, object) {
  const container = document.querySelector(`article[data-manager="${currSettings.currManager}"]`);
  await putData('managerStore', key, 'players', object)
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

// HERE - found out that issue with not showing players on relod is because when there is only one player on a team it does not show on realod

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
      console.log(data.players);
      displayMarkup(data, 'manager', document.querySelector('[data-js="managerContainer"]'), init);
    });
  });
}

// SETUP DB:
// on load setupDB, if settingsStore has data then display draft data
window.onload = async () => {
  await dbSetup('mockDraft', stores)
    .then((x) => {
      [db] = x;
      if (x[1]) {
        collectAndDisplayData(true);
        activateDraftButtons();
      }
    });
};

// APPLY USER SETTINGS
settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await storeUserSettings(db).then((x) => { userValues = x; });
  await dbAddPlayerData();
});

// RESET APP - clear stores and inputs, etc
resetButton.addEventListener('click', () => {
  dbStoreClear(stores);
  settingsForm.reset();
  userValues[0].forEach((value) => { value.parentNode.removeChild(value); });
});

// START APP
startForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await storeTextInputs(db);
  await collectAndDisplayData(true);
  activateDraftButtons();
});


/* Where You're At:
managerStore.players into arrays of player positions
*/

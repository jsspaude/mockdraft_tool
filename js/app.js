import regeneratorRuntime from "regenerator-runtime";

import {
  dbAddPlayerData, dbStoreClear, dbSetup, dbAddData, dbGetData, putData, collectCursorData,
} from './src/db';
import { stores, catObjects } from './src/config';
import {
  displayData, playersMarkup, managersMarkup, settingsMarkup, displayDrafted,
} from './src/view';

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
function updatePlayerData(player, curr) {
  const draftedData = { name: player.dataset.name, pos: player.dataset.pos, team: player.dataset.team };
  const primary = player.dataset.key;
  // eslint-disable-next-line no-param-reassign
  player.dataset.manager = curr;
  putData('playerStore', parseInt(primary, 10), 'manager', currSettings.currManager);
  return draftedData;
}


/* ADD CLICK EVENT TO DRAFT BUTTONS THEN PERFORM DRAFTING ACTIONS:
-click event is added to all player buttons, this click event then triggers:
- putting player data in proper manager store record
- displaying data in html
- updating currSettings
- storing currSettings
*/
function activateDraftButtons(array) {
  const draftButton = document.querySelectorAll('[data-js="draftBtn"]');
  draftButton.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const playerButton = updatePlayerData(btn, currSettings.currManager);
      console.log(playerButton);
      const primary = array[currSettings.currManager].primaryKey;
      await putData('managerStore', parseInt(primary, 10), undefined, playerButton)
        .then((object) => {
          
          displayDrafted();
        });
    });
  });
}

// COLLECT DATA FROM DB INTO ARRAYS AND DISPLAY
async function collectAndDisplayData(array) {
  await collectCursorData('playerStore', ['manager', 'adp', 'name', 'pos', 'team'], 'true').then((result) => {
    result.forEach((object) => {
      const data = catObjects(object);
      displayData(data, playersMarkup, document.querySelector('[data-js="playerTable"]'));
    });
  });
  await collectCursorData('managerStore', ['managerNum', 'managerName', 'player'], 'true').then((result) => {
    result.forEach((object) => {
      const data = catObjects(object);
      array.push(data);
      displayData(data, managersMarkup, document.querySelector('[data-js="managerContainer"]'));
    });
  });
  await collectCursorData('settingsStore', ['currManager', 'currRound']).then((result) => {
    let data;
    result.forEach((object) => {
      data = catObjects(object);
      displayData(data, settingsMarkup, document.querySelector('[data-js="settingsContainer"]'));
    });
    currSettings = data;
    return data;
  });
}

// SETUP DB:
// on load setupDB, if settingsStore has data then display draft data
window.onload = async () => {
  await dbSetup('mockDraft', stores)
    .then((x) => {
      [db] = x;
      if (x[1]) {
        const managerStoreArray = [];
        const display = async () => {
          await collectAndDisplayData(managerStoreArray);
          activateDraftButtons(managerStoreArray);
        };
        display();
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
  const managerStoreArray = [];
  await storeTextInputs(db);
  await collectAndDisplayData(managerStoreArray);
  activateDraftButtons(managerStoreArray);
});

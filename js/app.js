import regeneratorRuntime from "regenerator-runtime";

import {
  dbAddPlayerData, dbStoreClear, dbSetup, dbAddData, dbGetData,
} from './src/db';
import { stores } from './src/config';
import { viewData } from './src/view';

// VARIABLES
const settingsForm = document.querySelector('[data-js="settingsForm"]');
const resetButton = document.querySelector('[data-js="resetBtn"');
const startForm = document.querySelector('[data-js="startDraft"');
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

// RUN FUNCTIONS
async function storeUserSettings() {
  const getValues = await getUserValues();
  const manInputs = await createManagerInputs();
  await dbAddData('settingsStore', '', {
    ...getValues, id: 'tracker', currManager: 0, currRound: 0,
  });
  await dbGetData('settingsStore', 'id', 'tracker');
  return [manInputs, getValues];
}


// ON STARTDRAFT FORM SUBMIT: retrieve user inputs and store them in manager store.
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

// SETUP DB
window.onload = async () => { await dbSetup('mockDraft', stores).then((x) => { db = x; }); };
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
  viewData();
});

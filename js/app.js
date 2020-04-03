import regeneratorRuntime from "regenerator-runtime";

import {
  setupDraft, clearStore, setupDB,
} from './src/db';
import { storeSettings, startDraft } from './src/controller';
import { stores } from './src/config';

const settingsForm = document.querySelector('[data-js="settingsForm"]');
const resetButton = document.querySelector('[data-js="resetBtn"');
const startForm = document.querySelector('[data-js="startDraft"');
let userValues = [];
let db;

// SETUP DB
window.onload = async () => { await setupDB('mockDraft', stores).then((x) => { db = x; }); };
// APPLY USER SETTINGS
settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await storeSettings(db).then((x) => { userValues = x; });
  await setupDraft();
});
// RESET APP - clear stores and inputs, etc
resetButton.addEventListener('click', () => {
  clearStore(stores);
  settingsForm.reset();
  userValues[0].forEach((value) => { value.parentNode.removeChild(value); });
});
// START APP
startForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  startDraft(db);
});

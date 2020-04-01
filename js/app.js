import regeneratorRuntime from "regenerator-runtime";

import { startDraft } from './src/db';
import { storeSettings } from './src/controller';

const settingsForm = document.querySelector('[data-js="settingsForm"]');

settingsForm.addEventListener('submit', storeSettings);
window.onload = startDraft();

import { addData } from './db';

const getUserValues = () => {
  const [managerCount, rounds] = [
    parseInt(document.querySelector('[data-js="numManagers"]').value, 10),
    parseInt(document.querySelector('[data-js="numRounds"]').value, 10),
  ];
  return { managerCount, rounds };
};

function userSettings() {
  const mc = getUserValues().managerCount;
  const managerInput = Array.from(Array(mc)).map((_, i) => i);
  managerInput.forEach((manager, i) => {
    let nameInput = document.createElement('input'); 
    let managerName = document.querySelector('[data-js="managerInputContainer"]').appendChild(nameInput);
    managerName.setAttribute('placeholder', `Manager ${i}`);
    managerName.setAttribute('data-manager', i);
    managerName.setAttribute('data-js', 'managerName');
  });
}

async function storeSettings(e) {
  if (e) {
    e.preventDefault();
  }
  const getValues = await getUserValues();
  const getSettings = await userSettings();
  const storeSettings = await addData('settingsStore', '', getUserValues());
}


export default { userSettings };
export { storeSettings };

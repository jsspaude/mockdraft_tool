import { addData, getData } from './db';
import { displayData } from './view';


// PULL USER INPUTS

const getUserValues = () => {
  const [managerCount, rounds] = [
    parseInt(document.querySelector('[data-js="numManagers"]').value, 10),
    parseInt(document.querySelector('[data-js="numRounds"]').value, 10),
  ];
  return { managerCount, rounds };
};

// CREATE MANAGER NAME INPUTS

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

// const throttle = (func, limit) => {
//   let inThrottle;
//   return function () {
//     const args = arguments;
//     const context = this;
//     if (!inThrottle) {
//       func.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => inThrottle = false, limit);
//     }
//   };
// };

// RUN FUNCTIONS
async function storeSettings() {
  const getValues = await getUserValues();
  await createManagerInputs();
  await addData('settingsStore', '', {
    ...getValues, id: 'tracker', currManager: 0, currRound: 0,
  });
  await getData('settingsStore', 'id', 'tracker');
}

async function startDraft(db) {
  const inputs = [...document.querySelectorAll('[data-js="managerInput"]')];
  const res = [...inputs.map((v) => v.value)];
  const resUpdated = Array.from(res, (item, i) => item || `Manager ${i}`);
  await addData('managerStore', resUpdated);
  await displayData(db, 'managerStore', document.querySelector('[data-js="managerContainer"]'));
}

export default { storeSettings };

export { storeSettings, startDraft };

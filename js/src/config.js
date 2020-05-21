// HERE - turn into class = config

const draftDataURL = './js/draft_data.json';
const stores = ['playerStore', 'managerStore', 'settingsStore'];
const objectStores = [{ name: 'playerStore', option: { autoIncrement: true } }, { name: 'managerStore', option: { autoIncrement: true } }, { name: 'settingsStore', option: { autoIncrement: true } }];
const positions = {
  QB: 1, RB: 2, WR: 2, TE: 1, PK: 1, DST: 1, FLEX: 1,
};

function positionsArray(object) {
  const array = [];
  Object.entries(object).forEach((item) => {
    const posArray = `${item[0]} `.repeat(item[1]).split(' ').filter((v) => v !== '');
    array.push(...posArray);
  });
  return array;
}

function isEven(value) {
  if (value % 2 === 0) return true;
  return false;
}

function groupBy(objectArray, property) {
  if (objectArray.length === undefined) {
    const obj = objectArray[property];
    const newObj = { [obj]: [objectArray] };
    return newObj;
  }
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function counter(curr, limit, round) {
  return new Promise((resolve) => {
    let newCurr;
    let newRound;

    if (isEven(round)) {
      newCurr = curr - 1;
      if (curr === 0) {
        newRound = round + 1;
        resolve({ curr, round: newRound });
      } else {
        newRound = round;
      }
    } else {
      newCurr = curr + 1;
      if (newCurr > (limit - 1)) {
        newRound = round + 1;
        resolve({ curr, round: newRound });
      } else {
        newRound = round;
      }
    }
    resolve({ curr: newCurr, round: newRound });
  });
}
// HERE - end of draft if round > rounds


export default { draftDataURL };

export {
  draftDataURL, stores, objectStores, positions,
  positionsArray, isEven, groupBy, counter,
};

const draftDataURL = './js/draft_data.json';
const stores = ['playerStore', 'managerStore', 'settingsStore'];
const objectStores = [{ name: 'playerStore', option: { autoIncrement: true } }, { name: 'managerStore', option: { autoIncrement: true } }, { name: 'settingsStore', option: { autoIncrement: true } }];

function isEven(value) {
  if (value % 2 === 0) return true;
  return false;
}

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function catObjects(array) {
  if (array.length === 0) {
    return {};
  }
  const obj = array.pop();
  return Object.assign(obj, catObjects(array));
}

function chunk(arr, chunkSize, cache = []) {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
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


export default { draftDataURL };

export {
  draftDataURL, stores, objectStores, isEven, catObjects, chunk, isIterable, groupBy,
};

const draftDataURL = './js/draft_data.json';
const stores = ['playerStore', 'managerStore', 'settingsStore'];

const isEven = (value) => { // HELPER FOR ROUND TRACKING
  if (value % 2 === 0) return true;
  return false;
};

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

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

const chunk = (arr, chunkSize, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};


export default { draftDataURL };

export {
  draftDataURL, stores, isEven, catObjects, chunk, isIterable,
};

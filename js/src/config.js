const draftDataURL = './js/draft_data.json';
const stores = ['playerStore', 'managerStore', 'settingsStore'];


const chunkArray = (myArray, chunkSize) => {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }
  return results;
};

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


export default { draftDataURL };

export {
  draftDataURL, stores, chunkArray, isEven,
};

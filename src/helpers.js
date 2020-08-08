export function formatPrice(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '_')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getFunName() {
  const adjectives = [
    'adorable',
    'beautiful',
    'clean',
    'drab',
    'elegant',
    'fancy',
    'glamorous',
    'handsome',
    'long',
    'magnificent',
    'old-fashioned',
    'plain',
    'quaint',
    'sparkling',
    'ugliest',
    'unsightly',
    'angry',
    'bewildered',
    'clumsy',
    'defeated',
    'embarrassed',
    'fierce',
    'grumpy',
    'helpless',
    'itchy',
    'jealous',
    'lazy',
    'mysterious',
    'nervous',
    'obnoxious',
    'panicky',
    'repulsive',
    'scary',
    'thoughtless',
    'uptight',
    'worried',
  ];

  const nouns = [
    'women',
    'men',
    'children',
    'teeth',
    'feet',
    'people',
    'leaves',
    'mice',
    'geese',
    'halves',
    'knives',
    'wives',
    'lives',
    'elves',
    'loaves',
    'potatoes',
    'tomatoes',
    'cacti',
    'foci',
    'fungi',
    'nuclei',
    'syllabuses',
    'analyses',
    'diagnoses',
    'oases',
    'theses',
    'crises',
    'phenomena',
    'criteria',
    'data',
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}

export function isEven(value) {
  if (value % 2 === 0) return true;
  return false;
}

export function counter(current, managers) {
  let newCurr;
  let newRound;
  const limit = parseInt(managers, 10) * 0.01;
  const round = parseInt(current, 10);
  const curr = Number((current - parseInt(current, 10)).toFixed(2));

  if (isEven(round)) {
    if (curr === 0) {
      newRound = round + 1;
      return Number((newRound + curr).toFixed(2));
    }
    newCurr = curr - 0.01;
    newRound = round;
  } else {
    newCurr = curr + 0.01;
    if (newCurr > limit) {
      newRound = round + 1;
      return Number((newRound + curr).toFixed(2));
    }
    newRound = round;
  }
  return Number((newRound + newCurr).toFixed(2));
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const flattenObject = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
  const pre = prefix.length ? `${prefix}.` : '';
  if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
  else acc[pre + k] = obj[k];
  return acc;
}, {});

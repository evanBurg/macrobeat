const isUndefOrNull = obj => {
  return typeof obj === `undefined` || obj === null;
};

const isUndefOrNullOrWhiteSpace = str => {
  return typeof str === `undefined` || str === null || str.trim() === ``;
};

const generateRandomString = length => {
  const allowedChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let str = ``;
  for (let i = 0; i < length; i++) {
    str += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
  }
  return str;
};

const encodeSpaces = uri => {
  let str = ``;
  for (let i = 0; i < uri.length; i++) {
    str += uri.charAt(i) === ` ` ? `%20` : uri.charAt(i);
  }
  return str;
};

const unixTimestamp = () => (new Date().getTime() / 1000) | 0;

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const mergeResults = results => {
  const items = results.length;
  const largestSize = results.reduce((max, items) => items.length > max ? items.length : max, 0);
  let mergedArray = [];
  for(let i = 0; i < largestSize; i++){
    for(let j = 0; j < items; j++){
      if(results[j].length > i){
        mergedArray.push(results[j][i]);
      }
    }
  }
  return mergedArray;
} 

module.exports = {
  isUndefOrNull,
  isUndefOrNullOrWhiteSpace,
  generateRandomString,
  encodeSpaces,
  unixTimestamp,
  shuffleArray,
  mergeResults
};

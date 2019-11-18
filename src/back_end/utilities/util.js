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

module.exports = {
  isUndefOrNull,
  isUndefOrNullOrWhiteSpace,
  generateRandomString,
  encodeSpaces,
  unixTimestamp
};

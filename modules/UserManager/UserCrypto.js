const crypto = require('crypto');

const getPasswordHash = (password) => {
  return crypto.pbkdf2Sync(password, 'rn#qjweuqr!7?qac', 10000, 64, 'sha512').toString('hex');
};

const checkPassword = (str, hash) => {
  return getPasswordHash(str) === hash;
};

module.exports = {
  getPasswordHash,
  checkPassword,
};

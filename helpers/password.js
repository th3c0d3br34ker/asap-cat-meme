const crypto = require('node:crypto');

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');

  const derievedKey = crypto.scryptSync(password, salt, 64);

  return `${derievedKey.toString('hex')}:${salt}`;
};

const verifyPassword = (password, hashedPassword) => {
  const [key, salt] = hashedPassword.split(':');

  const derievedKey = crypto.scryptSync(password, salt, 64);

  return key === derievedKey.toString('hex');
};

module.exports = { hashPassword, verifyPassword };

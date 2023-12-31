const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');

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

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { hashPassword, verifyPassword, createToken, verifyToken };

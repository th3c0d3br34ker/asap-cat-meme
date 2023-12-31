const {
  verifyPassword,
  createToken,
  verifyToken,
} = require('../helpers/password');
const User = require('../schema/user');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Missing name or password!');
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send('User not found!');
  }

  const isPasswordValid = verifyPassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send('Invalid password!');
  }

  const token = createToken(user._id);

  res.send({ username, token });
};

const verify = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send('Missing token!');
  }
  const { id } = verifyToken(token);

  if (!id) {
    return res.status(400).send('Invalid token!');
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).send('User not found!');
  }

  res.send({ username: user.username, token });
};

const logout = async (req, res) => {};

module.exports = { login, logout, verify };

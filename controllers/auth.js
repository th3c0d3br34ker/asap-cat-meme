const {
  verifyPassword,
  createToken,
  verifyToken,
} = require('../helpers/password');
const User = require('../schema/user');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing name or password!' });
  }

  const user = await User.findOne({ username });

  console.log(user);

  if (!user) {
    return res.status(400).json({ message: 'User not found!' });
  }

  const isPasswordValid = verifyPassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: ' Invalid password!' });
  }

  const token = createToken(user._id);

  res.json({ username, token });
};

const verify = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Missing token!' });
  }
  const { id } = verifyToken(token);

  if (!id) {
    return res.status(400).json({ message: 'Invalid token!' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: 'User not found!' });
  }

  res.json({ username: user.username, token });
};

const logout = async (req, res) => {};

module.exports = { login, logout, verify };

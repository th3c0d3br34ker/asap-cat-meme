const User = require('../schema/user');
const { hashPassword, verifyPassword } = require('../helpers/password');

const list = async (req, res) => {
  res.json({ list: await User.find() });
};

const create = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing name or password!' });
  }

  const hashedPassword = hashPassword(password);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created!' });
};

const show = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.json({ message: 'User not found! :(' });
  }

  res.json(user);
};

const update = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.json({ message: 'User not found! :(' });
  }

  user.set(req.body);
  await user.save();
  res.send(user);
};

const remove = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.json({ message: 'User not found! :(' });
  }

  await user.deleteOne();
  res.json(user);
};

module.exports = { list, create, show, update, remove };

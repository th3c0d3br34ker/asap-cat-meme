const User = require('../schema/user');
const { hashPassword, verifyPassword } = require('../helpers/password')

const list = async (req, res) => {
  res.send(await User.find());
};

const create = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) return res.status(400).send('Missing name or password!');

  const hashedPassword = hashPassword(password);
  
  const newUser = new User({ name, password: hashedPassword });
  await newUser.save();
  res.status(201).send(newUser);
};

const show = async (req, res) => {

  const user = await User.findById(req.params.id);

  if (!user) return res.send('User not found! :(');

  res.send(user);
};

const update = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.send('User not found! :(');

  user.set(req.body);

  await user.save();

  res.send(user);
};

const remove = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.send('User not found! :(');

  await user.deleteOne();

  res.send(user);
};

module.exports = { list, create, show, update, remove };

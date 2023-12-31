const Meme = require('../schema/Meme');

//  Read data
const list = async (req, res) => {
  res.send(await Meme.find());
};

// Read one data
const show = async (req, res) => {
  const meme = await Meme.findById(req.params.id);

  if (!meme) {
    return res.send('Meme not found! :(');
  }

  res.send(meme);
};

// Create data
const create = async (req, res) => {
  const newMeme = new Meme(req.body);
  await newMeme.save();
  res.status(201).send(newMeme);
};

// Update data
const update = async (req, res) => {
  const meme = await Meme.findById(req.params.id);

  if (!meme) {
    return res.send('Meme not found! :(');
  }

  meme.set(req.body);
  await meme.save();
  res.send(meme);
};

// Delete data
const remove = async (req, res) => {
  const meme = await Meme.findById(req.params.id);

  if (!meme) {
    return res.send('Meme not found! :(');
  }

  await meme.deleteOne();
  res.send(meme);
};

module.exports = { list, show, create, update, remove };

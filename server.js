require('dotenv').config({ path: '.env.local' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const Meme = require('./schema/Meme.js')

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open', () => {
  console.log('📦 database connected');
});

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log('🚀 server started on port:', PORT);
});

app.get('/', (req, res) => {
  res.send('o_O');
});

// Read data
app.get('/data', async (req, res) => {
  res.send(await Meme.find());
})

// Read one data
app.get('/data/:id', async (req, res) => {
  const meme = await Meme.findById(req.params.id)

  if (!meme) return res.send("Meme not found! :(")

  res.send(meme)
})

// Create data
app.post('/data', async (req, res) => {
  const newMeme = new Meme(req.body)

  await newMeme.save()

  res.status(201).send(newMeme);
})

// Update data
app.put('/data/:id', async (req, res) => {
  const meme = await Meme.findById(req.params.id);

  if (!meme) return res.send("Meme not found! :(")

  await meme.updateOne(req.body)

  await meme.save()

  res.send(meme);
});


// Delete data
app.delete("/data/:id", async (req, res) => {
  const meme = await Meme.findById(req.params.id)

  if (!meme) return res.send("Meme not found! :(")

  await meme.deleteOne()

  res.send(meme)
})

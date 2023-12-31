require('dotenv').config({ path: '.env.local' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open', () => {
  console.log('📦 database connected');

  app.listen(PORT, () => {
    console.log('🚀 server started on port:', PORT);
  });
});

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('o_O');
});

app.use('/api', require('./routers'));

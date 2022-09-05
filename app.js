require('dotenv').config({ path: './config/config.env' });

const { connectDB } = require('./config/db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});

app.listen(PORT, () =>
  console.log(`Server running in ${NODE_ENV} mode on port: ${PORT}`)
);

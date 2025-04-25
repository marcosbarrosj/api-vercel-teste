const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando na Vercel!');
});

module.exports = app;

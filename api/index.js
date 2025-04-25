const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err.message));

const Usuario = mongoose.model('Usuario', {
  nome: String,
  email: String
});

app.get('/', (req, res) => {
  res.send('API rodando na Vercel!');
});

app.post('/cadastro', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const novoUsuario = await Usuario.create({ nome, email });
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err.message);
    res.status(500).json({ erro: 'Erro ao cadastrar' });
  }
});

module.exports = app;
module.exports.handler = serverless(app); // <- Essencial para Vercel!

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis do .env

const app = express();
app.use(express.json());

// Conectando ao MongoDB Atlas usando variável do .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error(err));

// Modelo de usuário
const Usuario = mongoose.model('Usuario', {
  nome: String,
  email: String
});

// Rota de status
app.get('/', (req, res) => {
  res.send('API rodando na Vercel!');
});

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const novoUsuario = await Usuario.create({ nome, email });
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar' });
  }
});

module.exports = app;

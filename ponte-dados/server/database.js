const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3010;

mongoose.connect('mongodb://localhost:27017/PONTE-DADOS')
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
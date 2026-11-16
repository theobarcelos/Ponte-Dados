'use server';
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors');


const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  dbName: "PONTE-DADOS"
})
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

app.use(express.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const ProdutoSchema = new mongoose.Schema(
  {
    descricao: { type: String, required: true, trim: true },
    quantidade: { type: Number, required: true, min: 1 }
  },
  { _id: false } // Evita criar _id em cada item do array.
);

const Pedido = new mongoose.Schema(
  {
    nf: { type: String, required: true, trim: true },
    fornecedor: { type: String, required: true, trim: true },
    pedido: { type: String, required: true, trim: true },
    solicitante: { type: String, required: true, trim: true },
    dataPrevista: { type: String, required: true },
    status: {
      type: String,
      enum: ["Aguardando recebimento", "Recebido", "Em atraso"],
      default: "Aguardando recebimento",
      required: true
    },
    aceitarRejeitar: {
      type: String,
      enum: ["Aceito", "Rejeitado", null],
      default: null
    },
    produtos: {
      type: [ProdutoSchema],
      required: true,
      validate: [(val) => val.length > 0, "Adicione no mínimo 1 produto!"]
    }
  },
  {
    versionKey: false, // Desativa o campo __v do Mongoose para não conflitar com o JSON Schema do banco
    collection: "pedidos" // Nome exato da coleção no MongoDB (altere se a sua coleção tiver outro nome)
  }
)

const NovoPedido = mongoose.model("pedido", Pedido)

app.post("/insertNovoPedido", async (req, res) => {
  try {
    const {
      nf,
      fornecedor,
      pedido,
      solicitante,
      dataPrevista,
      status,
      aceitarRejeitar,
      produtos
    } = req.body;

    const produtosFormatados = Array.isArray(produtos) ? produtos.map((item) => ({
      descricao: item.descricao,
      quantidade: Number(item.quantidade)
    }))
      : []

    const novoDocumento = await NovoPedido.create({
      nf,
      fornecedor,
      pedido,
      solicitante,
      dataPrevista,
      status: status || 'Aguardando recebimento',
      aceitarRejeitar: aceitarRejeitar ?? null,
      produtos: produtosFormatados
    });

    return res.status(201).json({
      mensagem: "Pedido Cadastrado com sucesso!",
      dados: novoDocumento
    })
  } catch (e) {
    console.error("Erro ao inserir o pedido: ", e)

    return res.status(400).json({
      erro: "Falha ao cadastrar pedido",
      detalhes: e.message
    })
  }


})

app.get("/listarPedidos", async (req, res) => {
  try {
    // Busca todos os pedidos no MongoDB, ordenando do mais recente para o mais antigo (_id decrescente)
    const pedidos = await NovoPedido.find().sort({ _id: -1 });

    return res.status(200).json({
      sucesso: true,
      total: pedidos.length,
      dados: pedidos
    });
  } catch (e) {
    console.error("Erro ao buscar pedidos: ", e);
    return res.status(500).json({
      erro: "Falha ao buscar pedidos",
      detalhes: e.message
    });
  }
});

app.get("/listarPedidos", async (req, res) => {
  try {
    // Busca todos os pedidos no MongoDB, ordenando do mais recente para o mais antigo (_id decrescente)
    const pedidos = await NovoPedido.find().countDocuments();

    return res.status(200).json({
      sucesso: true,
      total: pedidos.length,
      dados: pedidos
    });
  } catch (e) {
    console.error("Erro ao buscar pedidos: ", e);
    return res.status(500).json({
      erro: "Falha ao buscar pedidos",
      detalhes: e.message
    });
  }
});

export default app;
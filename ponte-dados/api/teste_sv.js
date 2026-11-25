require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const port = 3010;

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "PONTE-DADOS"
  });
  isConnected = true;
}

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

const NovoPedido = mongoose.models.pedido || mongoose.model("pedido", Pedido);

// novo-pedido
app.post("/insertNovoPedido", async (req, res) => {
  try {
    await connectDB();

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

// Status
app.get("/listarPedidos", async (req, res) => {
  try {
    await connectDB();

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

app.put("/atualizarPedido/:nf", async (req, res) => {
  try {
    await connectDB();
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

    const produtosFormatados = Array.isArray(produtos)
      ? produtos.map((item) => ({
        descricao: item.descricao,
        quantidade: Number(item.quantidade)
      }))
      : [];

    const atualizar = await NovoPedido.updateOne(
      { nf: req.params.nf },
      {
        $set: {
          nf,
          fornecedor,
          pedido,
          solicitante,
          dataPrevista,
          status: status || "Aguardando recebimento",
          aceitarRejeitar: aceitarRejeitar ?? null,
          produtos: produtosFormatados
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!atualizar) {
      return res.status(404).json({
        erro: "Pedido não encontrado para a NF informada."
      });
    }

    return res.status(201).json({
      pedidoAtt: atualizar
    })
    
  } catch (e) {
    console.error("Erro ao atualizar pedido: ", e.message);
    return res.status(400).json({
      erro: "Falha ao atualizar pedido",
      detalhes: e.message
    });
  }
})

app.put("/atualizarStatus", async (req, res) => {
  try{
    await connectDB();
    const { nf, status } = req.body;
    const atualizar = await NovoPedido.updateOne(
       { nf: nf },
       { $set: { status: status } } 
    )
    res.status(201).json({
      status: status
    })
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      e
    })
  }
})

// Home
app.get("/contarPedidos", async (req, res) => {
  try {
    await connectDB();

    const recebidos = await NovoPedido.find({ status: "Recebido" }).countDocuments();
    const aguardando = await NovoPedido.find({ status: "Aguardando recebimento" }).countDocuments();
    const atrasados = await NovoPedido.find({ status: "Em atraso" }).countDocuments();

    return res.status(200).json({
      recebidos: recebidos,
      aguardandoRecebimento: aguardando,
      emAtraso: atrasados
    });
  } catch (e) {
    console.error("Erro ao buscar pedidos: ", e);
    return res.status(500).json({
      erro: "Falha ao buscar pedidos",
      detalhes: e.message
    });
  }
});

app.get("/detalhesPedido/:nf", async (req, res) => {
  try {
    await connectDB();
    const pedido = await NovoPedido.find({ nf: req.params.nf }, { _id: false })
    res.status(200).json({
      pedido: pedido
    });
  } catch (e) {
    res.status(500).json(e.message);
    console.error("Erro: ", e.message);
  }
})

app.listen(port, () => {
  console.log("Porta rodando!")
})

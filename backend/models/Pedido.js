const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  itens: [
    {
      produtoId: String,
      nome: String,
      preco: Number,
      quantidade: Number,
      imagem: String,
    },
  ],
  cliente: {
    nome: String,
    telefone: String,
    endereco: String,
    observacoes: String,
    formaPagamento: String,
  },
  status: {
    type: String,
    enum: ["pendente", "preparando", "pronto", "entregue"],
    default: "pendente",
  },
  subtotal: Number,
  taxaEntrega: Number,
  total: Number,
  dataPedido: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pedido", PedidoSchema);

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const app = express();

app.use(cors());
app.use(express.json());

// Configuração do banco
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pizzaria",
});

// Rota de teste
app.get("/teste", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

// Buscar todos os produtos
app.get("/api/produtos", async (req, res) => {
  try {
    const [produtos] = await pool.query("SELECT * FROM produtos");
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

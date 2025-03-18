const mysql = require("mysql2/promise");

async function testarConexao() {
  try {
    // Tenta conectar ao banco
    const conexao = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "pizzaria",
    });

    console.log("✅ Conexão bem sucedida!");

    // Testa buscar produtos
    const [produtos] = await conexao.query("SELECT * FROM produtos");
    console.log(`✅ ${produtos.length} produtos encontrados!`);
    console.log("\nPrimeiro produto:", produtos[0]);

    await conexao.end();
  } catch (erro) {
    console.error("❌ Erro:", erro);
  }
}

testarConexao();

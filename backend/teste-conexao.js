const db = require("./config/database");

async function testeConexao() {
  try {
    // Testa a conexão
    const [resultado] = await db.query("SELECT 1 + 1 as soma");
    console.log("Conexão bem sucedida!");

    // Testa a leitura dos produtos
    const [produtos] = await db.query("SELECT * FROM produtos");
    console.log("Produtos encontrados:", produtos.length);

    // Mostra o primeiro produto
    if (produtos.length > 0) {
      console.log("Primeiro produto:", produtos[0]);
    }
  } catch (error) {
    console.error("Erro:", error);
  } finally {
    process.exit();
  }
}

testeConexao();

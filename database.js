// Classe para gerenciar o banco de dados
class Database {
  constructor() {
    this.produtos = [
      {
        id: 'pizza1',
        nome: 'Pizza Pepperoni',
        descricao: 'Molho de tomate, mussarela e pepperoni',
        preco: 45.00,
        categoria: 'pizzas',
        imagem: 'https://www.pngmart.com/files/1/Pepperoni-Pizza-PNG-Transparent-Image.png'
      },
      // Adicione mais produtos aqui
    ];
    this.pedidos = [];
    this.carregarDados();
  }

  carregarDados() {
    // Carregar dados do localStorage
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (pedidosSalvos) {
      this.pedidos = JSON.parse(pedidosSalvos);
    }
  }

  salvarPedidos() {
    // Salvar dados no localStorage
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
  }

  // Métodos para produtos
  adicionarProduto(produto) {
    this.produtos.push(produto);
  }

  buscarProdutos() {
    return this.produtos;
  }

  // Métodos para pedidos
  adicionarPedido(pedido) {
    this.pedidos.push(pedido);
    this.salvarPedidos();
  }

  buscarPedidos() {
    return this.pedidos;
  }

  atualizarStatusPedido(id, novoStatus) {
    const pedido = this.pedidos.find((p) => p.id === id);
    if (pedido) {
      pedido.status = novoStatus;
    }
  }
}

// Criar instância global do banco de dados
window.db = new Database();

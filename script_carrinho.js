// Estado do carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const TAXA_ENTREGA = 5.0;

console.log("Carrinho carregado:", carrinho);

// Funções do Carrinho
function atualizarCarrinho() {
  console.log("Atualizando carrinho...");
  const itensCarrinho = document.querySelector(".carrinho-itens");
  const total = calcularTotal();

  // Atualiza lista de itens
  if (carrinho.length === 0) {
    console.log("Carrinho vazio");
    itensCarrinho.innerHTML = `
      <div class="carrinho-vazio">
        <i class="bi bi-cart-x"></i>
        <p>Seu carrinho está vazio</p>
        <a href="cardapio.html" class="btn-voltar">Voltar ao Cardápio</a>
      </div>
    `;
    return;
  }

  console.log("Renderizando itens do carrinho:", carrinho);
  itensCarrinho.innerHTML = carrinho
    .map(
      (item) => `
      <div class="item-carrinho">
        <div class="item-imagem">
          <img src="${item.imagem}" alt="${item.nome}" />
        </div>
        <div class="item-info">
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2)}</p>
        </div>
        <div class="item-controles">
          <button onclick="atualizarQuantidade('${item.id}', ${
        item.quantidade - 1
      })">
            <i class="bi bi-dash"></i>
          </button>
          <span>${item.quantidade}</span>
          <button onclick="atualizarQuantidade('${item.id}', ${
        item.quantidade + 1
      })">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn-remover" onclick="removerDoCarrinho('${item.id}')">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="item-subtotal">
          R$ ${item.subtotal.toFixed(2)}
        </div>
      </div>
    `
    )
    .join("");

  // Atualiza totais
  document.querySelector(
    ".subtotal span:last-child"
  ).textContent = `R$ ${total.subtotal.toFixed(2)}`;
  document.querySelector(
    ".total span:last-child"
  ).textContent = `R$ ${total.total.toFixed(2)}`;
}

function atualizarQuantidade(id, novaQuantidade) {
  const item = carrinho.find((item) => item.id === id);
  if (item) {
    item.quantidade = Math.max(1, novaQuantidade);
    item.subtotal = item.quantidade * item.preco;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
  }
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((item) => item.id !== id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
  mostrarNotificacao("Item removido do carrinho!");
}

function calcularTotal() {
  const subtotal = carrinho.reduce((total, item) => total + item.subtotal, 0);
  return {
    subtotal,
    total: subtotal + TAXA_ENTREGA,
  };
}

// Funções dos Modais
function finalizarPedido() {
  if (carrinho.length === 0) {
    mostrarNotificacao("Adicione itens ao carrinho primeiro!");
    return;
  }
  document.getElementById("modalFinalizar").style.display = "flex";
}

function fecharModalFinalizar() {
  document.getElementById("modalFinalizar").style.display = "none";
}

// Função de Notificação
function mostrarNotificacao(mensagem) {
  const notificacao = document.createElement("div");
  notificacao.className = "notificacao";
  notificacao.innerHTML = `
    <i class="bi bi-check-circle"></i>
    <span>${mensagem}</span>
  `;

  document.body.appendChild(notificacao);

  setTimeout(() => {
    notificacao.classList.add("show");
    setTimeout(() => {
      notificacao.classList.remove("show");
      setTimeout(() => {
        notificacao.remove();
      }, 300);
    }, 2000);
  }, 100);
}

// Função de Envio do Pedido
function enviarPedido(event) {
  event.preventDefault();

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    mostrarNotificacao("Carrinho vazio!");
    return;
  }

  const pedido = {
    cliente: {
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      endereco: document.getElementById("endereco").value,
      observacoes: document.getElementById("observacoes").value,
      formaPagamento: document.getElementById("formaPagamento").value,
    },
    itens: carrinho,
    subtotal: calcularTotal().subtotal,
    taxaEntrega: TAXA_ENTREGA,
    total: calcularTotal().total,
    status: "pendente",
    data: new Date().toISOString(),
  };

  // Adiciona o pedido ao banco de dados
  db.adicionarPedido(pedido);

  // Limpa o carrinho
  localStorage.removeItem("carrinho");

  // Mostra notificação
  mostrarNotificacao("Pedido realizado com sucesso!");

  // Redireciona para a página de pedidos
  setTimeout(() => {
    window.location.href = "pedidos.html";
  }, 1000);
}

// Fechar modal ao clicar fora
window.onclick = function (event) {
  const modalFinalizar = document.getElementById("modalFinalizar");
  if (event.target === modalFinalizar) {
    fecharModalFinalizar();
  }
};

// Menu Mobile
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  atualizarCarrinho();
});

// Estado do carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const TAXA_ENTREGA = 5.0;

// Funções do Carrinho
function adicionarAoCarrinho(produto) {
  console.log(
    "Adicionando ao carrinho:",
    produto.id,
    produto.nome,
    produto.preco,
    produto.imagem
  );

  // Verifica se o item já existe no carrinho
  const itemExistente = carrinho.find((item) => item.id === produto.id);

  if (itemExistente) {
    // Se existir, aumenta a quantidade
    itemExistente.quantidade++;
    itemExistente.subtotal = itemExistente.quantidade * itemExistente.preco;
  } else {
    // Se não existir, adiciona novo item
    carrinho.push({
      ...produto,
      quantidade: 1,
      subtotal: produto.preco,
    });
  }

  // Salva no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  console.log("Carrinho salvo:", carrinho);

  // Atualiza o contador
  atualizarContador();

  // Mostra notificação
  mostrarNotificacao("Item adicionado ao carrinho!");

  // Redireciona para o carrinho após um pequeno delay
  setTimeout(() => {
    window.location.href = "carrinho.html";
  }, 1000);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((item) => item.id !== id);
  atualizarCarrinho();
  mostrarNotificacao("Item removido do carrinho!");
}

function atualizarQuantidade(id, novaQuantidade) {
  const item = carrinho.find((item) => item.id === id);
  if (item) {
    item.quantidade = Math.max(1, novaQuantidade);
    item.subtotal = item.quantidade * item.preco;
    atualizarCarrinho();
  }
}

function calcularTotal() {
  const subtotal = carrinho.reduce((total, item) => total + item.subtotal, 0);
  return {
    subtotal,
    total: subtotal + TAXA_ENTREGA,
  };
}

// Funções de Interface
function atualizarCarrinho() {
  const itensCarrinho = document.querySelector(".itens-carrinho");
  const contadorItens = document.querySelector(".contador-itens");
  const total = calcularTotal();

  // Atualiza contador
  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );
  contadorItens.textContent = totalItens;

  // Atualiza lista de itens
  itensCarrinho.innerHTML = carrinho
    .map(
      (item) => `
        <div class="item-carrinho">
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
                <button class="btn-remover" onclick="removerDoCarrinho('${
                  item.id
                }')">
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

// Funções dos Modais
function abrirCarrinho() {
  document.getElementById("modalCarrinho").style.display = "flex";
}

function fecharCarrinho() {
  document.getElementById("modalCarrinho").style.display = "none";
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    mostrarNotificacao("Adicione itens ao carrinho primeiro!");
    return;
  }
  fecharCarrinho();
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

  const formData = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    endereco: document.getElementById("endereco").value,
    observacoes: document.getElementById("observacoes").value,
    formaPagamento: document.getElementById("formaPagamento").value,
    itens: carrinho,
    ...calcularTotal(),
  };

  // Aqui você pode adicionar a lógica para enviar o pedido para um servidor
  console.log("Pedido:", formData);

  // Limpa o carrinho e fecha o modal
  carrinho = [];
  atualizarCarrinho();
  fecharModalFinalizar();
  document.getElementById("formPedido").reset();

  mostrarNotificacao("Pedido realizado com sucesso!");
}

// Fechar modais ao clicar fora
window.onclick = function (event) {
  const modalCarrinho = document.getElementById("modalCarrinho");
  const modalFinalizar = document.getElementById("modalFinalizar");

  if (event.target === modalCarrinho) {
    fecharCarrinho();
  }
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

// Navegação entre categorias
const categoriaBtns = document.querySelectorAll(".categoria-btn");
const categorias = document.querySelectorAll(".categoria");

categoriaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoriaBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const categoriaId = btn.getAttribute("data-categoria");

    categorias.forEach((cat) => {
      cat.style.display = "none";
    });

    document.getElementById(categoriaId).style.display = "block";
  });
});

// Função para salvar carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para atualizar o contador de itens
function atualizarContador() {
  const contador = document.querySelector(".contador-itens");
  if (contador) {
    const totalItens = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );
    contador.textContent = totalItens;
    console.log("Contador atualizado:", totalItens);
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicializando cardápio...");
  // Atualiza o contador inicial
  atualizarContador();

  // Adiciona eventos aos botões de pedir
  document.querySelectorAll(".btn-pedir").forEach((botao) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const produtoElement = botao.closest(".produto");
      const produto = {
        id: produtoElement.dataset.id,
        nome: produtoElement.querySelector("h3").textContent,
        preco: parseFloat(
          produtoElement.querySelector(".preco").textContent.replace("R$ ", "")
        ),
        imagem: produtoElement.querySelector("img").src,
      };

      adicionarAoCarrinho(produto);
    });
  });
});

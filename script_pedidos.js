// Função para formatar preço
function formatarPreco(valor) {
  return `R$ ${parseFloat(valor).toFixed(2)}`;
}

// Função para carregar os pedidos
function carregarPedidos() {
  const listaPedidos = document.querySelector(".lista-pedidos");
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  // Limpa a lista atual
  listaPedidos.innerHTML = "";

  if (pedidos.length === 0) {
    listaPedidos.innerHTML = `
            <div class="sem-pedidos">
                <i class="bi bi-inbox"></i>
                <p>Nenhum pedido encontrado</p>
            </div>
        `;
    return;
  }

  // Para cada pedido, cria um card
  pedidos.forEach((pedido, index) => {
    const pedidoElement = document.createElement("div");
    pedidoElement.className = "pedido-card";

    // Cria o HTML do pedido
    pedidoElement.innerHTML = `
            <div class="pedido-header">
                <span class="pedido-numero">Pedido #${index + 1}</span>
                <span class="pedido-status ${pedido.status || "pendente"}">${
      pedido.status || "Pendente"
    }</span>
                <span class="pedido-data">${new Date().toLocaleDateString()}</span>
            </div>
            
            <div class="pedido-content">
                <div class="pedido-cliente">
                    <h3><i class="bi bi-person-circle"></i> Dados do Cliente</h3>
                    <p><strong>Nome:</strong> ${
                      pedido.cliente?.nome || "N/A"
                    }</p>
                    <p><strong>Telefone:</strong> ${
                      pedido.cliente?.telefone || "N/A"
                    }</p>
                    <p><strong>Endereço:</strong> ${
                      pedido.cliente?.endereco || "N/A"
                    }</p>
                </div>
                
                <div class="pedido-itens">
                    <h3><i class="bi bi-cart3"></i> Itens do Pedido</h3>
                    <div class="itens-lista">
                        ${pedido.itens
                          .map(
                            (item) => `
                            <div class="item-pedido">
                                <img src="${item.imagem}" alt="${
                              item.nome
                            }" class="item-imagem">
                                <div class="item-info">
                                    <span class="item-nome">${item.nome}</span>
                                    <span class="item-quantidade">x${
                                      item.quantidade
                                    }</span>
                                    <span class="item-preco">${formatarPreco(
                                      item.preco * item.quantidade
                                    )}</span>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
                
                <div class="pedido-total">
                    <p class="subtotal"><strong>Subtotal:</strong> ${formatarPreco(
                      pedido.subtotal || 0
                    )}</p>
                    <p class="taxa"><strong>Taxa de Entrega:</strong> R$ 5,00</p>
                    <p class="total"><strong>Total:</strong> ${formatarPreco(
                      (pedido.subtotal || 0) + 5
                    )}</p>
                </div>
            </div>
            
            <div class="pedido-footer">
                <div class="acoes-pedido">
                    <button class="btn-status preparar" onclick="atualizarStatus(${index}, 'preparando')">
                        <i class="bi bi-play-circle"></i> Preparar
                    </button>
                    <button class="btn-status pronto" onclick="atualizarStatus(${index}, 'pronto')">
                        <i class="bi bi-check-circle"></i> Pronto
                    </button>
                    <button class="btn-status entregar" onclick="atualizarStatus(${index}, 'entregue')">
                        <i class="bi bi-truck"></i> Entregar
                    </button>
                </div>
            </div>
        `;

    listaPedidos.appendChild(pedidoElement);
  });
}

// Função para atualizar o status do pedido
function atualizarStatus(index, novoStatus) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  if (pedidos[index]) {
    pedidos[index].status = novoStatus;
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    carregarPedidos(); // Recarrega a lista
  }
}

// Função para filtrar pedidos
function filtrarPedidos(status = "todos") {
  const pedidosCards = document.querySelectorAll(".pedido-card");

  pedidosCards.forEach((card) => {
    const statusPedido = card
      .querySelector(".pedido-status")
      .textContent.toLowerCase();
    if (status === "todos" || statusPedido === status.toLowerCase()) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Adicione estes estilos ao seu CSS
const styles = `
.pedido-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    padding: 20px;
}

.pedido-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.pedido-status {
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
}

.pedido-status.pendente { background: #ffc107; }
.pedido-status.preparando { background: #17a2b8; }
.pedido-status.pronto { background: #28a745; }
.pedido-status.entregue { background: #6c757d; }

.item-pedido {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.item-imagem {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 15px;
}

.item-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pedido-total {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.btn-status {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    color: white;
}

.btn-status.preparar { background: #ffc107; }
.btn-status.pronto { background: #28a745; }
.btn-status.entregar { background: #17a2b8; }

.sem-pedidos {
    text-align: center;
    padding: 40px;
    color: #6c757d;
}

.sem-pedidos i {
    font-size: 48px;
    margin-bottom: 10px;
}
`;

// Adiciona os estilos ao documento
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Inicializa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  carregarPedidos();

  // Adiciona listeners para os botões de filtro
  document.querySelectorAll(".btn-filtro").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".btn-filtro")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      filtrarPedidos(btn.dataset.status);
    });
  });
});

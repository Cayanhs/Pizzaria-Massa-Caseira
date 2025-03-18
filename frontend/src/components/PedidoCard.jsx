import React from "react";
import "./PedidoCard.css";

const PedidoCard = ({ pedido }) => {
  const getStatusColor = (status) => {
    const cores = {
      pendente: "#ffd700",
      preparando: "#ff8c00",
      pronto: "#32cd32",
      entregue: "#4169e1",
    };
    return cores[status] || "#gray";
  };

  return (
    <div className="pedido-card">
      <div className="pedido-header">
        <span className="pedido-numero">Pedido #{pedido.id}</span>
        <span
          className="pedido-status"
          style={{ backgroundColor: getStatusColor(pedido.status) }}
        >
          {pedido.status}
        </span>
      </div>

      <div className="pedido-cliente">
        <h3>Dados do Cliente</h3>
        <p>
          <i className="bi bi-person"></i> {pedido.cliente.nome}
        </p>
        <p>
          <i className="bi bi-telephone"></i> {pedido.cliente.telefone}
        </p>
        <p>
          <i className="bi bi-geo-alt"></i> {pedido.cliente.endereco}
        </p>
      </div>

      <div className="pedido-itens">
        <h3>Itens do Pedido</h3>
        {pedido.itens.map((item, index) => (
          <div key={index} className="item">
            <img src={item.imagem} alt={item.nome} />
            <div className="item-info">
              <span className="item-nome">{item.nome}</span>
              <span className="item-quantidade">x{item.quantidade}</span>
              <span className="item-preco">
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pedido-resumo">
        <div className="resumo-item">
          <span>Subtotal:</span>
          <span>R$ {pedido.subtotal.toFixed(2)}</span>
        </div>
        <div className="resumo-item">
          <span>Taxa de Entrega:</span>
          <span>R$ {pedido.taxaEntrega.toFixed(2)}</span>
        </div>
        <div className="resumo-item total">
          <span>Total:</span>
          <span>R$ {pedido.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PedidoCard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const [itens, setItens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar itens do localStorage quando o componente montar
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];
    setItens(carrinhoSalvo);
  }, []);

  const calcularTotal = () => {
    return itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const finalizarPedido = () => {
    // Aqui você pode adicionar a lógica para salvar o pedido
    // Por enquanto, vamos apenas limpar o carrinho e ir para pedidos
    localStorage.removeItem("carrinho");
    navigate("/pedidos");
  };

  return (
    <div className="carrinho">
      <h1>Seu Carrinho</h1>
      <div className="itens-carrinho">
        {itens.map((item) => (
          <div key={item.id} className="item-carrinho">
            <img src={item.imagem} alt={item.nome} />
            <div className="item-info">
              <h3>{item.nome}</h3>
              <p>Quantidade: {item.quantidade}</p>
              <p>Preço: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>
        <button onClick={finalizarPedido}>Finalizar Pedido</button>
      </div>
    </div>
  );
}

export default Carrinho;

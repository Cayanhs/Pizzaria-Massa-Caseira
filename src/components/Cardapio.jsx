import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cardapio.css";

const Cardapio = () => {
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState("pizzas");

  const handlePedidoClick = (id) => {
    navigate(`/pedido/${id}`);
  };

  return (
    <main className="cardapio">
      <h1 className="cardapio-titulo">
        <i className="bi bi-menu-button-wide"></i>
        Nosso Cardápio
      </h1>

      <div className="categorias">
        <button
          className={`categoria-btn ${
            categoriaAtiva === "pizzas" ? "active" : ""
          }`}
          onClick={() => setCategoriaAtiva("pizzas")}
        >
          <i className="bi bi-pizza"></i> Pizzas
        </button>
        <button
          className={`categoria-btn ${
            categoriaAtiva === "esfihas" ? "active" : ""
          }`}
          onClick={() => setCategoriaAtiva("esfihas")}
        >
          <i className="bi bi-egg-fried"></i> Esfihas
        </button>
        <button
          className={`categoria-btn ${
            categoriaAtiva === "pasteis" ? "active" : ""
          }`}
          onClick={() => setCategoriaAtiva("pasteis")}
        >
          <i className="bi bi-cup-hot"></i> Pastéis
        </button>
      </div>

      <section
        className="categoria"
        id="pizzas"
        style={{ display: categoriaAtiva === "pizzas" ? "block" : "none" }}
      >
        <h2>
          <i className="bi bi-pizza"></i> Pizzas
        </h2>
        <div className="produtos">
          <div className="produto" onClick={() => handlePedidoClick("pizza1")}>
            <img
              src="https://www.pngmart.com/files/1/Pepperoni-Pizza-PNG-Transparent-Image.png"
              alt="Pizza Pepperoni"
            />
            <h3>Pepperoni</h3>
            <p>Molho de tomate, mussarela e pepperoni</p>
            <span className="preco">R$ 45,00</span>
            <button
              className="btn-pedir"
              onClick={(e) => {
                e.stopPropagation();
                // Lógica do carrinho aqui
              }}
            >
              <i className="bi bi-cart-plus"></i> Pedir
            </button>
          </div>
          {/* Adicione mais produtos aqui */}
        </div>
      </section>

      {/* Repita a estrutura para esfihas e pastéis */}
    </main>
  );
};

export default Cardapio;

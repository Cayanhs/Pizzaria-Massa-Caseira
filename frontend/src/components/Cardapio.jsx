import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("pizzas");
  const navigate = useNavigate();

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    carregarProdutos();
  }, []);

  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itemExistente = carrinhoAtual.find((item) => item.id === produto._id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
      localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
    } else {
      const novoItem = {
        id: produto._id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem,
        quantidade: 1,
      };
      localStorage.setItem(
        "carrinho",
        JSON.stringify([...carrinhoAtual, novoItem])
      );
    }

    navigate("/carrinho");
  };

  return (
    <div className="cardapio">
      <div className="categorias">
        <button
          className={`categoria-btn ${
            categoriaAtiva === "pizzas" ? "active" : ""
          }`}
          onClick={() => setCategoriaAtiva("pizzas")}
        >
          <i className="bi bi-pizza"></i> Pizzas
        </button>
        {/* Adicione outros botões de categoria aqui */}
      </div>

      <div className="produtos">
        {produtos
          .filter((produto) => produto.categoria === categoriaAtiva)
          .map((produto) => (
            <div key={produto._id} className="produto">
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <span className="preco">R$ {produto.preco.toFixed(2)}</span>
              <button
                className="btn-pedir"
                onClick={() => adicionarAoCarrinho(produto)}
              >
                <i className="bi bi-cart-plus"></i> Pedir
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cardapio;

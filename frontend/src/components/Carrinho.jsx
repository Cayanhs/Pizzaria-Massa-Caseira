import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrinho = () => {
  const [itens, setItens] = useState([]);
  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    observac,
  });

  return <div>{/* Renderização do componente */}</div>;
};

export default Carrinho;

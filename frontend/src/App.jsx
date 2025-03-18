import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cardapio from "./components/Cardapio";
import Carrinho from "./components/Carrinho";
import Pedidos from "./components/Pedidos";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cardapio from "./components/Cardapio";
import DetalhePedido from "./components/DetalhePedido";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/pedido/:id" element={<DetalhePedido />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

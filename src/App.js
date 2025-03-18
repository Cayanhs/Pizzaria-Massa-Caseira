import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cardapio from "./components/Cardapio";
import Carrinho from "./components/Carrinho";
import Pedidos from "./components/Pedidos";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

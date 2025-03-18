import React, { useState, useEffect } from "react";
import PedidoCard from './PedidoCard';
import './Pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  useEffect(() => {
    // Simular carregamento de pedidos
    // Substitua isso pela sua chamada API real
    const pedidosExemplo = [
      {
        id: '001',
        status: 'pendente',
        cliente: {
          nome: 'João Silva',
          telefone: '(85) 99999-9999',
          endereco: 'Rua A, 123'
        },
        itens: [
          {
            nome: 'Pizza Pepperoni',
            quantidade: 1,
            preco: 45.00,
            imagem: 'url-da-imagem'
          }
        ],
        subtotal: 45.00,
        taxaEntrega: 5.00,
        total: 50.00
      }
      // Adicione mais pedidos de exemplo aqui
    ];

    setPedidos(pedidosExemplo);
  }, []);

  const filtrarPedidos = () => {
    return pedidos.filter(pedido => {
      if (filtroStatus !== 'todos' && pedido.status !== filtroStatus) {
        return false;
      }
      // Adicione mais lógica de filtro por data se necessário
      return true;
    });
  };

  return (
    <div className="pedidos-container">
      <div className="filtros">
        <div className="filtros-status">
          <button 
            className={`filtro-btn ${filtroStatus === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('todos')}
          >
            Todos
          </button>
          <button 
            className={`filtro-btn ${filtroStatus === 'pendente' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('pendente')}
          >
            Pendentes
          </button>
          <button 
            className={`filtro-btn ${filtroStatus === 'preparando' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('preparando')}
          >
            Preparando
          </button>
          <button 
            className={`filtro-btn ${filtroStatus === 'pronto' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('pronto')}
          >
            Prontos
          </button>
          <button 
            className={`filtro-btn ${filtroStatus === 'entregue' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('entregue')}
          >
            Entregues
          </button>
        </div>

        <div className="filtros-data">
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            placeholder="Data Início"
          />
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            placeholder="Data Fim"
          />
        </div>
      </div>

      <div className="lista-pedidos">
        {filtrarPedidos().map(pedido => (
          <PedidoCard key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </div>
  );
};

export default Pedidos;

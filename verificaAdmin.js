function verificaAdmin() {
  const usuario = JSON.parse(localStorage.getItem('usuario')) || 
                 JSON.parse(sessionStorage.getItem('usuario'));
  
  if (!usuario || !usuario.logado || usuario.tipo !== 'admin') {
    // Se não estiver logado como admin, redireciona para a página inicial
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Executa a verificação quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
  if (!verificaAdmin()) {
    mostrarNotificacao('Acesso não autorizado. Faça login como administrador.', 'error');
  }
}); 
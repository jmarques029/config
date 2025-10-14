// Arquivo para executar todos os testes do projeto
// Executa: npm run test:console

import { executarTestesCapas } from './Capa.test';
import { executarTestesRating } from './Rating.test';

function executarTodosOsTestes() {
  console.log('🚀 === EXECUTANDO TODOS OS TESTES === 🚀\n');
  
  // Testes das entidades
  executarTestesCapas();
  
  // Testes dos value objects
  executarTestesRating();
  
  console.log('\n🎉 === TODOS OS TESTES CONCLUÍDOS === 🎉');
}

// Executar automaticamente se for o arquivo principal
executarTodosOsTestes();
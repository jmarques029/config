// Testes para a entidade Capa
// Para executar: npm test

import { Capa } from '../domain/entities/Capa';
import { Rating } from '../domain/value-objects/Rating';
import { PrecoValue } from '../domain/value-objects/PrecoValue';
import { ImagemValue } from '../domain/value-objects/ImagemValue';

// Função de teste simples
function testCriarCapaValida() {
  console.log('🧪 Testando criação de capa válida...');
  
  try {
    const capa = Capa.create(
      'test-id',
      'Capa Teste',
      ImagemValue.create('./image/teste.png'),
      Rating.create(4),
      PrecoValue.create(25.90),
      'Teste'
    );

    console.assert(capa.id === 'test-id', 'ID deve ser test-id');
    console.assert(capa.nome === 'Capa Teste', 'Nome deve ser Capa Teste');
    console.assert(capa.categoria === 'Teste', 'Categoria deve ser Teste');
    console.assert(capa.rating.value === 4, 'Rating deve ser 4');
    console.assert(capa.preco.value === 25.90, 'Preço deve ser 25.90');
    
    console.log('✅ Teste de criação passou!');
  } catch (error) {
    console.error('❌ Teste de criação falhou:', error);
  }
}

function testCapaInvalida() {
  console.log('🧪 Testando capa com dados inválidos...');
  
  try {
    // Teste ID vazio
    try {
      Capa.create('', 'Nome', ImagemValue.create('./test.png'), Rating.create(4), PrecoValue.create(25.90), 'Categoria');
      console.error('❌ Deveria ter falhado com ID vazio');
    } catch (error) {
      console.assert(error instanceof Error && error.message.includes('ID da capa é obrigatório'), 'Erro de ID correto');
    }

    // Teste nome vazio
    try {
      Capa.create('id', '', ImagemValue.create('./test.png'), Rating.create(4), PrecoValue.create(25.90), 'Categoria');
      console.error('❌ Deveria ter falhado com nome vazio');
    } catch (error) {
      console.assert(error instanceof Error && error.message.includes('Nome da capa é obrigatório'), 'Erro de nome correto');
    }
    
    console.log('✅ Teste de validação passou!');
  } catch (error) {
    console.error('❌ Teste de validação falhou:', error);
  }
}

function testAtualizarNome() {
  console.log('🧪 Testando atualização de nome...');
  
  try {
    const capa = Capa.create(
      'test-id',
      'Nome Original',
      ImagemValue.create('./image/teste.png'),
      Rating.create(4),
      PrecoValue.create(25.90),
      'Teste'
    );

    capa.updateNome('Nome Atualizado');
    console.assert(capa.nome === 'Nome Atualizado', 'Nome deve ter sido atualizado');
    
    console.log('✅ Teste de atualização passou!');
  } catch (error) {
    console.error('❌ Teste de atualização falhou:', error);
  }
}

function testMarcarPopular() {
  console.log('🧪 Testando marcar como popular...');
  
  try {
    const capa = Capa.create(
      'test-id',
      'Capa Teste',
      ImagemValue.create('./image/teste.png'),
      Rating.create(4),
      PrecoValue.create(25.90),
      'Teste'
    );

    console.assert(capa.popular === false, 'Inicialmente não deve ser popular');
    
    capa.marcarComoPopular();
    console.assert(capa.popular === true, 'Deve ser marcada como popular');
    
    capa.desmarcarComoPopular();
    console.assert(capa.popular === false, 'Deve ser desmarcada como popular');
    
    console.log('✅ Teste de popular passou!');
  } catch (error) {
    console.error('❌ Teste de popular falhou:', error);
  }
}

// Executar todos os testes
export function executarTestesCapas() {
  console.log('🎯 === TESTES DA ENTIDADE CAPA === 🎯\n');
  
  testCriarCapaValida();
  testCapaInvalida();
  testAtualizarNome();
  testMarcarPopular();
  
  console.log('\n✅ Todos os testes da entidade Capa concluídos!');
}
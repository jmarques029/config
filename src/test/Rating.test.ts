// Testes para o Value Object Rating
// Para executar: npm test

import { Rating } from '../domain/value-objects/Rating';

function testCriarRatingValido() {
  console.log('🧪 Testando criação de rating válido...');
  
  try {
    const rating = Rating.create(4);
    console.assert(rating.value === 4, 'Rating deve ter valor 4');
    console.log('✅ Teste passou!');
  } catch (error) {
    console.error('❌ Teste falhou:', error);
  }
}

function testConverterParaEstrelas() {
  console.log('🧪 Testando conversão para estrelas...');
  
  try {
    const rating4 = Rating.create(4);
    console.assert(rating4.toStars() === '★★★★☆', 'Rating 4 deve ser ★★★★☆');
    
    const rating5 = Rating.create(5);
    console.assert(rating5.toStars() === '★★★★★', 'Rating 5 deve ser ★★★★★');
    
    const rating0 = Rating.create(0);
    console.assert(rating0.toStars() === '☆☆☆☆☆', 'Rating 0 deve ser ☆☆☆☆☆');
    
    console.log('✅ Teste passou!');
  } catch (error) {
    console.error('❌ Teste falhou:', error);
  }
}

function testCriarDeEstrelas() {
  console.log('🧪 Testando criação a partir de estrelas...');
  
  try {
    const rating = Rating.fromStars('★★★☆☆');
    console.assert(rating.value === 3, 'Rating deve ter valor 3');
    console.log('✅ Teste passou!');
  } catch (error) {
    console.error('❌ Teste falhou:', error);
  }
}

function testValoresInvalidos() {
  console.log('🧪 Testando valores inválidos...');
  
  try {
    Rating.create(-1);
    console.error('❌ Teste deveria ter falhado com valor -1');
  } catch (error) {
    console.log('✅ Teste passou - erro esperado:', (error as Error).message);
  }

  try {
    Rating.create(6);
    console.error('❌ Teste deveria ter falhado com valor 6');
  } catch (error) {
    console.log('✅ Teste passou - erro esperado:', (error as Error).message);
  }

  try {
    Rating.create(3.5);
    console.error('❌ Teste deveria ter falhado com valor 3.5');
  } catch (error) {
    console.log('✅ Teste passou - erro esperado:', (error as Error).message);
  }
}

// Executar todos os testes
export function executarTestesRating() {
  console.log('⭐ === TESTES DO VALUE OBJECT RATING === ⭐\n');
  
  testCriarRatingValido();
  testConverterParaEstrelas();
  testCriarDeEstrelas();
  testValoresInvalidos();
  
  console.log('\n✅ Todos os testes do Rating concluídos!');
}
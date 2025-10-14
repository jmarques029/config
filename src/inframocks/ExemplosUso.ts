import { MockCapaRepository } from './MockCapaRepository';
import { ListarCapas } from '../domain/use-cases/ListarCapas';
import { CriarCapa } from '../domain/use-cases/CriarCapa';
import { EditarCapa } from '../domain/use-cases/EditarCapa';
import { ExcluirCapa } from '../domain/use-cases/ExcluirCapa';
import { PesquisarCapas } from '../domain/use-cases/PesquisarCapas';

/**
 * Exemplos de uso do sistema JC Encadernados
 * Baseado no repositório: https://github.com/jmarques029/ProgWeb---JC-Encadernados
 */

// Configuração do repositório mock
const capaRepository = new MockCapaRepository();

// Instanciação dos casos de uso
const listarCapas = new ListarCapas(capaRepository);
const criarCapa = new CriarCapa(capaRepository);
const editarCapa = new EditarCapa(capaRepository);
const excluirCapa = new ExcluirCapa(capaRepository);
const pesquisarCapas = new PesquisarCapas(capaRepository);

/**
 * Exemplo 1: Listar todas as capas (como na página index.html)
 */
export async function exemploListarTodasCapas() {
  console.log('=== Listando todas as capas ===');
  try {
    const capas = await listarCapas.execute();
    console.log(`Total de capas: ${capas.length}`);
    
    capas.forEach(capa => {
      console.log(`- ${capa.nome} (${capa.categoria}) - ${capa.preco.toString()} - ${capa.rating.toString()}`);
    });
  } catch (error) {
    console.error('Erro ao listar capas:', error);
  }
}

/**
 * Exemplo 2: Listar capas populares (seção "Populares" do HTML)
 */
export async function exemploListarCapasPopulares() {
  console.log('\n=== Listando capas populares ===');
  try {
    const capasPopulares = await listarCapas.executePopulares();
    console.log(`Capas populares: ${capasPopulares.length}`);
    
    capasPopulares.forEach(capa => {
      console.log(`- ${capa.nome} - ${capa.preco.toString()}`);
    });
  } catch (error) {
    console.error('Erro ao listar capas populares:', error);
  }
}

/**
 * Exemplo 3: Listar capas recomendadas (seção "Recomendados" do HTML)
 */
export async function exemploListarCapasRecomendadas() {
  console.log('\n=== Listando capas recomendadas ===');
  try {
    const capasRecomendadas = await listarCapas.executeRecomendadas();
    console.log(`Capas recomendadas: ${capasRecomendadas.length}`);
    
    capasRecomendadas.forEach(capa => {
      console.log(`- ${capa.nome} - ${capa.preco.toString()}`);
    });
  } catch (error) {
    console.error('Erro ao listar capas recomendadas:', error);
  }
}

/**
 * Exemplo 4: Pesquisar capas (funcionalidade do search do HTML)
 */
export async function exemploPesquisarCapas() {
  console.log('\n=== Pesquisando capas ===');
  try {
    // Pesquisa por "Flores" (categoria do menu)
    const resultadoFlores = await pesquisarCapas.execute('Flores');
    console.log(`Pesquisa "Flores": ${resultadoFlores.length} resultados`);
    
    // Pesquisa por "Nossa Senhora" (nome específico)
    const resultadoNossaSenhora = await pesquisarCapas.execute('Nossa Senhora');
    console.log(`Pesquisa "Nossa Senhora": ${resultadoNossaSenhora.length} resultados`);
    
    // Pesquisa por categoria "Profissões"
    const resultadoProfissoes = await pesquisarCapas.executePorCategoria('Profissões');
    console.log(`Categoria "Profissões": ${resultadoProfissoes.length} capas`);
    
  } catch (error) {
    console.error('Erro ao pesquisar capas:', error);
  }
}

/**
 * Exemplo 5: Criar nova capa (funcionalidade admin)
 */
export async function exemploCriarCapa() {
  console.log('\n=== Criando nova capa ===');
  try {
    await criarCapa.execute({
      id: 'nova-capa-teste',
      nome: 'Capa Teste Criada',
      imagemUrl: './image/teste.png',
      rating: 5,
      preco: 29.99,
      categoria: 'Diversos',
      popular: false,
      recomendada: true
    });
    
    console.log('Capa criada com sucesso!');
    
    // Verifica se foi criada
    const capasCriadas = await listarCapas.execute();
    const capaEncontrada = capasCriadas.find(c => c.id === 'nova-capa-teste');
    if (capaEncontrada) {
      console.log(`Capa encontrada: ${capaEncontrada.nome}`);
    }
    
  } catch (error) {
    console.error('Erro ao criar capa:', error);
  }
}

/**
 * Exemplo 6: Editar capa existente (funcionalidade admin)
 */
export async function exemploEditarCapa() {
  console.log('\n=== Editando capa ===');
  try {
    // Edita a capa "Nossa Senhora" (do exemplo original)
    await editarCapa.execute({
      id: 'capa-nossa-senhora',
      preco: 27.90, // Novo preço
      popular: true,
      recomendada: true // Marca como recomendada também
    });
    
    console.log('Capa editada com sucesso!');
    
    // Verifica a alteração
    const capaEditada = await capaRepository.findById('capa-nossa-senhora');
    if (capaEditada) {
      console.log(`Preço atualizado: ${capaEditada.preco.toString()}`);
      console.log(`Popular: ${capaEditada.popular}, Recomendada: ${capaEditada.recomendada}`);
    }
    
  } catch (error) {
    console.error('Erro ao editar capa:', error);
  }
}

/**
 * Exemplo 7: Excluir capa (funcionalidade admin)
 */
export async function exemploExcluirCapa() {
  console.log('\n=== Excluindo capa ===');
  try {
    const totalAntes = await capaRepository.count();
    console.log(`Total de capas antes: ${totalAntes}`);
    
    // Exclui a capa criada no exemplo anterior
    await excluirCapa.execute('nova-capa-teste');
    
    const totalDepois = await capaRepository.count();
    console.log(`Total de capas depois: ${totalDepois}`);
    console.log('Capa excluída com sucesso!');
    
  } catch (error) {
    console.error('Erro ao excluir capa:', error);
  }
}

/**
 * Exemplo 8: Buscar por categoria específica (menu lateral do HTML)
 */
export async function exemploListarPorCategoria() {
  console.log('\n=== Listando por categoria ===');
  try {
    // Categorias do menu original: Flores, Borboletas, Profissões, etc.
    const categorias = ['Flores', 'Borboletas', 'Profissões', 'Religioso'];
    
    for (const categoria of categorias) {
      const capasCategoria = await listarCapas.executeByCategoria(categoria);
      console.log(`${categoria}: ${capasCategoria.length} capas`);
    }
    
  } catch (error) {
    console.error('Erro ao listar por categoria:', error);
  }
}

/**
 * Executa todos os exemplos
 */
export async function executarTodosExemplos() {
  console.log('🎨 === EXEMPLOS DO SISTEMA JC ENCADERNADOS === 🎨\n');
  console.log('Baseado no repositório: https://github.com/jmarques029/ProgWeb---JC-Encadernados\n');
  
  await exemploListarTodasCapas();
  await exemploListarCapasPopulares();
  await exemploListarCapasRecomendadas();
  await exemploPesquisarCapas();
  await exemploListarPorCategoria();
  await exemploCriarCapa();
  await exemploEditarCapa();
  await exemploExcluirCapa();
  
  console.log('\n✅ Todos os exemplos executados com sucesso!');
}

// Para executar os exemplos, chame a função executarTodosExemplos() diretamente
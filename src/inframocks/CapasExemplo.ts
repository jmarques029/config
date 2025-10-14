import { Capa } from '../domain/entities/Capa';
import { Rating } from '../domain/value-objects/Rating';
import { PrecoValue } from '../domain/value-objects/PrecoValue';
import { ImagemValue } from '../domain/value-objects/ImagemValue';

// Dados baseados no repositório original https://github.com/jmarques029/ProgWeb---JC-Encadernados
export const CAPAS_EXEMPLO: Capa[] = [
  // Capas Populares
  Capa.create(
    'capa-nossa-senhora',
    'Capa Nossa Senhora',
    ImagemValue.createFromRelativePath('./image/Nossa Senhora.png'),
    Rating.create(4),
    PrecoValue.create(25.90),
    'Religioso',
    true, // popular
    false
  ),

  Capa.create(
    'capa-barbearia',
    'Capa Barbearia',
    ImagemValue.createFromRelativePath('./image/Barbearia.png'),
    Rating.create(4),
    PrecoValue.create(22.50),
    'Profissões',
    true, // popular
    false
  ),

  Capa.create(
    'capa-borboleta',
    'Capa Borboleta',
    ImagemValue.createFromRelativePath('./image/Borboletas.png'),
    Rating.create(4),
    PrecoValue.create(28.90),
    'Borboletas',
    true, // popular
    false
  ),

  Capa.create(
    'capa-flores',
    'Capa Flores',
    ImagemValue.createFromRelativePath('./image/Flores.png'),
    Rating.create(4),
    PrecoValue.create(26.75),
    'Flores',
    true, // popular
    false
  ),

  // Capas Recomendadas
  Capa.create(
    'capa-nuvem',
    'Capa Nuvem',
    ImagemValue.createFromRelativePath('./image/Cadernetaa.png'),
    Rating.create(4),
    PrecoValue.create(24.99),
    'Paisagem',
    false,
    true // recomendada
  ),

  Capa.create(
    'capa-beato-carlo-acutis',
    'Capa Beato Carlo Acutis',
    ImagemValue.createFromRelativePath('./image/Beato Carlo Acutis.png'),
    Rating.create(4),
    PrecoValue.create(29.90),
    'Religioso',
    false,
    true // recomendada
  ),

  Capa.create(
    'capa-professora',
    'Capa Professora',
    ImagemValue.createFromRelativePath('./image/Professora.jpg'),
    Rating.create(4),
    PrecoValue.create(23.80),
    'Profissões',
    false,
    true // recomendada
  ),

  Capa.create(
    'capa-planner',
    'Capa Planner',
    ImagemValue.createFromRelativePath('./image/Planner.jpg'),
    Rating.create(4),
    PrecoValue.create(32.50),
    'Diversos',
    false,
    true // recomendada
  ),

  // Capas adicionais baseadas nas categorias do menu
  Capa.create(
    'capa-infantil-01',
    'Capa Desenho Infantil',
    ImagemValue.createFromRelativePath('./image/infantil01.png'),
    Rating.create(5),
    PrecoValue.create(19.90),
    'Infantil',
    false,
    false
  ),

  Capa.create(
    'capa-masculina-01',
    'Capa Masculina Esporte',
    ImagemValue.createFromRelativePath('./image/masculina01.png'),
    Rating.create(3),
    PrecoValue.create(27.90),
    'Masculina',
    false,
    false
  ),

  Capa.create(
    'capa-paisagem-01',
    'Capa Paisagem Montanha',
    ImagemValue.createFromRelativePath('./image/paisagem01.png'),
    Rating.create(4),
    PrecoValue.create(25.50),
    'Paisagem',
    false,
    false
  ),

  Capa.create(
    'capa-personagem-01',
    'Capa Personagem Anime',
    ImagemValue.createFromRelativePath('./image/personagem01.png'),
    Rating.create(5),
    PrecoValue.create(31.90),
    'Personagem',
    false,
    false
  ),

  Capa.create(
    'capa-tecnologia-01',
    'Capa Tecnologia Circuit',
    ImagemValue.createFromRelativePath('./image/tecnologia01.png'),
    Rating.create(4),
    PrecoValue.create(30.00),
    'Tecnologia',
    false,
    false
  ),

  Capa.create(
    'capa-filmes-01',
    'Capa Cinema Vintage',
    ImagemValue.createFromRelativePath('./image/filmes01.png'),
    Rating.create(3),
    PrecoValue.create(28.75),
    'Filmes',
    false,
    false
  )
];

// Categorias baseadas no menu do site original
export const CATEGORIAS_EXEMPLO = [
  'Flores',
  'Borboletas', 
  'Profissões',
  'Paisagem',
  'Infantil',
  'Masculina',
  'Diversos',
  'Personagem',
  'Tecnologia',
  'Filmes',
  'Religioso'
];

// Função para obter capas populares
export function getCapasPopulares(): Capa[] {
  return CAPAS_EXEMPLO.filter(capa => capa.popular);
}

// Função para obter capas recomendadas
export function getCapasRecomendadas(): Capa[] {
  return CAPAS_EXEMPLO.filter(capa => capa.recomendada);
}

// Função para obter capas por categoria
export function getCapasPorCategoria(categoria: string): Capa[] {
  return CAPAS_EXEMPLO.filter(capa => capa.categoria === categoria);
}

// Função para pesquisar capas por nome
export function pesquisarCapas(termo: string): Capa[] {
  const termoLower = termo.toLowerCase();
  return CAPAS_EXEMPLO.filter(capa => 
    capa.nome.toLowerCase().includes(termoLower) ||
    capa.categoria.toLowerCase().includes(termoLower)
  );
}
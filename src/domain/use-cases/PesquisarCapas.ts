import { Capa } from '../entities/Capa';
import { CapaRepository } from '../repositories/CapaRepository';

export class PesquisarCapas {
  constructor(private readonly capaRepository: CapaRepository) {}

  async execute(termo: string): Promise<Capa[]> {
    // Validação de entrada
    if (!termo || termo.trim() === '') {
      throw new Error('Termo de pesquisa é obrigatório');
    }

    const termoLimpo = termo.trim();

    if (termoLimpo.length < 2) {
      throw new Error('Termo de pesquisa deve ter pelo menos 2 caracteres');
    }

    try {
      return await this.capaRepository.search(termoLimpo);
    } catch (error) {
      throw new Error(`Erro ao pesquisar capas: ${error}`);
    }
  }

  async executePorCategoria(categoria: string): Promise<Capa[]> {
    if (!categoria || categoria.trim() === '') {
      throw new Error('Categoria é obrigatória');
    }

    try {
      return await this.capaRepository.findByCategoria(categoria);
    } catch (error) {
      throw new Error(`Erro ao pesquisar capas por categoria: ${error}`);
    }
  }

  async executeAvancada(filtros: {
    termo?: string;
    categoria?: string;
    apenasPopulares?: boolean;
    apenasRecomendadas?: boolean;
  }): Promise<Capa[]> {
    try {
      let capas: Capa[] = [];

      // Se há termo de pesquisa, usa busca textual
      if (filtros.termo && filtros.termo.trim() !== '') {
        capas = await this.capaRepository.search(filtros.termo.trim());
      } else {
        // Senão, busca todas
        capas = await this.capaRepository.findAll();
      }

      // Aplica filtros adicionais
      if (filtros.categoria) {
        capas = capas.filter(capa => capa.categoria === filtros.categoria);
      }

      if (filtros.apenasPopulares) {
        capas = capas.filter(capa => capa.popular);
      }

      if (filtros.apenasRecomendadas) {
        capas = capas.filter(capa => capa.recomendada);
      }

      return capas;
    } catch (error) {
      throw new Error(`Erro na pesquisa avançada: ${error}`);
    }
  }
}
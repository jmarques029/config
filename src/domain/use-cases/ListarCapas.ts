import { Capa } from '../entities/Capa';
import { CapaRepository } from '../repositories/CapaRepository';

export class ListarCapas {
  constructor(private readonly capaRepository: CapaRepository) {}

  async execute(): Promise<Capa[]> {
    try {
      return await this.capaRepository.findAll();
    } catch (error) {
      throw new Error(`Erro ao listar capas: ${error}`);
    }
  }

  async executePopulares(): Promise<Capa[]> {
    try {
      return await this.capaRepository.findPopulares();
    } catch (error) {
      throw new Error(`Erro ao listar capas populares: ${error}`);
    }
  }

  async executeRecomendadas(): Promise<Capa[]> {
    try {
      return await this.capaRepository.findRecomendadas();
    } catch (error) {
      throw new Error(`Erro ao listar capas recomendadas: ${error}`);
    }
  }

  async executeByCategoria(categoria: string): Promise<Capa[]> {
    if (!categoria || categoria.trim() === '') {
      throw new Error('Categoria é obrigatória');
    }

    try {
      return await this.capaRepository.findByCategoria(categoria);
    } catch (error) {
      throw new Error(`Erro ao listar capas da categoria ${categoria}: ${error}`);
    }
  }
}
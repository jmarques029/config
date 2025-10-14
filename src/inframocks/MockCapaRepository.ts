import { Capa } from '../domain/entities/Capa';
import { CapaRepository } from '../domain/repositories/CapaRepository';
import { CAPAS_EXEMPLO } from './CapasExemplo';

export class MockCapaRepository implements CapaRepository {
  private capas: Capa[] = [...CAPAS_EXEMPLO];

  async findById(id: string): Promise<Capa | null> {
    const capa = this.capas.find(c => c.id === id);
    return capa || null;
  }

  async findAll(): Promise<Capa[]> {
    return [...this.capas];
  }

  async findByCategoria(categoria: string): Promise<Capa[]> {
    return this.capas.filter(capa => capa.categoria === categoria);
  }

  async findPopulares(): Promise<Capa[]> {
    return this.capas.filter(capa => capa.popular);
  }

  async findRecomendadas(): Promise<Capa[]> {
    return this.capas.filter(capa => capa.recomendada);
  }

  async search(termo: string): Promise<Capa[]> {
    const termoLower = termo.toLowerCase();
    return this.capas.filter(capa =>
      capa.nome.toLowerCase().includes(termoLower) ||
      capa.categoria.toLowerCase().includes(termoLower)
    );
  }

  async save(capa: Capa): Promise<void> {
    // Verifica se já existe
    const exists = await this.exists(capa.id);
    if (exists) {
      throw new Error(`Capa com ID ${capa.id} já existe`);
    }
    
    this.capas.push(capa);
  }

  async update(capa: Capa): Promise<void> {
    const index = this.capas.findIndex(c => c.id === capa.id);
    if (index === -1) {
      throw new Error(`Capa com ID ${capa.id} não encontrada`);
    }
    
    this.capas[index] = capa;
  }

  async delete(id: string): Promise<void> {
    const index = this.capas.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Capa com ID ${id} não encontrada`);
    }
    
    this.capas.splice(index, 1);
  }

  async exists(id: string): Promise<boolean> {
    return this.capas.some(c => c.id === id);
  }

  async existsByNome(nome: string): Promise<boolean> {
    return this.capas.some(c => c.nome === nome);
  }

  async count(): Promise<number> {
    return this.capas.length;
  }

  async countByCategoria(categoria: string): Promise<number> {
    return this.capas.filter(c => c.categoria === categoria).length;
  }

  // Métodos auxiliares para testes
  reset(): void {
    this.capas = [...CAPAS_EXEMPLO];
  }

  clear(): void {
    this.capas = [];
  }

  addCapa(capa: Capa): void {
    this.capas.push(capa);
  }
}
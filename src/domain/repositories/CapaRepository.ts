import { Capa } from '../entities/Capa';

export interface CapaRepository {
  // Buscar operações
  findById(id: string): Promise<Capa | null>;
  findAll(): Promise<Capa[]>;
  findByCategoria(categoria: string): Promise<Capa[]>;
  findPopulares(): Promise<Capa[]>;
  findRecomendadas(): Promise<Capa[]>;
  search(termo: string): Promise<Capa[]>;

  // Operações de persistência
  save(capa: Capa): Promise<void>;
  update(capa: Capa): Promise<void>;
  delete(id: string): Promise<void>;

  // Operações de verificação
  exists(id: string): Promise<boolean>;
  existsByNome(nome: string): Promise<boolean>;

  // Operações de contagem
  count(): Promise<number>;
  countByCategoria(categoria: string): Promise<number>;
}
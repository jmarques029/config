import { Categoria } from '../entities/Categoria';

export interface CategoriaRepository {
  // Buscar operações
  findById(id: string): Promise<Categoria | null>;
  findByNome(nome: string): Promise<Categoria | null>;
  findAll(): Promise<Categoria[]>;
  findAtivas(): Promise<Categoria[]>;

  // Operações de persistência
  save(categoria: Categoria): Promise<void>;
  update(categoria: Categoria): Promise<void>;
  delete(id: string): Promise<void>;

  // Operações de verificação
  exists(id: string): Promise<boolean>;
  existsByNome(nome: string): Promise<boolean>;

  // Operações de contagem
  count(): Promise<number>;
  countAtivas(): Promise<number>;
}
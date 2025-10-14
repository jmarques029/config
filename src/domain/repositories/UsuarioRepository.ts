import { Usuario } from '../entities/Usuario';

export interface UsuarioRepository {
  // Buscar operações
  findById(id: string): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  findAll(): Promise<Usuario[]>;
  findByTipo(tipo: 'admin' | 'cliente'): Promise<Usuario[]>;
  findAtivos(): Promise<Usuario[]>;

  // Operações de persistência
  save(usuario: Usuario): Promise<void>;
  update(usuario: Usuario): Promise<void>;
  delete(id: string): Promise<void>;

  // Operações de verificação
  exists(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;

  // Operações de contagem
  count(): Promise<number>;
  countByTipo(tipo: 'admin' | 'cliente'): Promise<number>;
  countAtivos(): Promise<number>;
}
import { Capa } from '../entities/Capa';
import { CapaRepository } from '../repositories/CapaRepository';
import { Rating } from '../value-objects/Rating';
import { PrecoValue } from '../value-objects/PrecoValue';
import { ImagemValue } from '../value-objects/ImagemValue';

export interface CriarCapaRequest {
  id: string;
  nome: string;
  imagemUrl: string;
  rating: number;
  preco: number;
  categoria: string;
  popular?: boolean;
  recomendada?: boolean;
}

export class CriarCapa {
  constructor(private readonly capaRepository: CapaRepository) {}

  async execute(request: CriarCapaRequest): Promise<void> {
    // Validações de entrada
    if (!request.id || request.id.trim() === '') {
      throw new Error('ID da capa é obrigatório');
    }

    if (!request.nome || request.nome.trim() === '') {
      throw new Error('Nome da capa é obrigatório');
    }

    if (!request.categoria || request.categoria.trim() === '') {
      throw new Error('Categoria da capa é obrigatória');
    }

    // Verifica se já existe uma capa com este ID
    const capaExistente = await this.capaRepository.exists(request.id);
    if (capaExistente) {
      throw new Error(`Já existe uma capa com o ID: ${request.id}`);
    }

    // Verifica se já existe uma capa com este nome
    const nomeExistente = await this.capaRepository.existsByNome(request.nome);
    if (nomeExistente) {
      throw new Error(`Já existe uma capa com o nome: ${request.nome}`);
    }

    try {
      // Cria os value objects
      const imagem = ImagemValue.create(request.imagemUrl);
      const rating = Rating.create(request.rating);
      const preco = PrecoValue.create(request.preco);

      // Cria a entidade Capa
      const novaCapa = Capa.create(
        request.id,
        request.nome,
        imagem,
        rating,
        preco,
        request.categoria,
        request.popular || false,
        request.recomendada || false
      );

      // Persiste no repositório
      await this.capaRepository.save(novaCapa);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao criar capa: ${error}`);
    }
  }
}
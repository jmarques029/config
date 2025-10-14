import { Capa } from '../entities/Capa';
import { CapaRepository } from '../repositories/CapaRepository';
import { Rating } from '../value-objects/Rating';
import { PrecoValue } from '../value-objects/PrecoValue';
import { ImagemValue } from '../value-objects/ImagemValue';

export interface EditarCapaRequest {
  id: string;
  nome?: string;
  imagemUrl?: string;
  rating?: number;
  preco?: number;
  categoria?: string;
  popular?: boolean;
  recomendada?: boolean;
}

export class EditarCapa {
  constructor(private readonly capaRepository: CapaRepository) {}

  async execute(request: EditarCapaRequest): Promise<void> {
    // Validação de entrada
    if (!request.id || request.id.trim() === '') {
      throw new Error('ID da capa é obrigatório');
    }

    try {
      // Busca a capa existente
      const capaExistente = await this.capaRepository.findById(request.id);
      if (!capaExistente) {
        throw new Error(`Capa com ID ${request.id} não encontrada`);
      }

      // Verifica se está tentando alterar o nome para um que já existe
      if (request.nome && request.nome !== capaExistente.nome) {
        const nomeExistente = await this.capaRepository.existsByNome(request.nome);
        if (nomeExistente) {
          throw new Error(`Já existe uma capa com o nome: ${request.nome}`);
        }
      }

      // Aplica as alterações apenas nos campos fornecidos
      if (request.nome !== undefined) {
        capaExistente.updateNome(request.nome);
      }

      if (request.imagemUrl !== undefined) {
        const novaImagem = ImagemValue.create(request.imagemUrl);
        capaExistente.updateImagem(novaImagem);
      }

      if (request.rating !== undefined) {
        const novoRating = Rating.create(request.rating);
        capaExistente.updateRating(novoRating);
      }

      if (request.preco !== undefined) {
        const novoPreco = PrecoValue.create(request.preco);
        capaExistente.updatePreco(novoPreco);
      }

      if (request.popular !== undefined) {
        if (request.popular) {
          capaExistente.marcarComoPopular();
        } else {
          capaExistente.desmarcarComoPopular();
        }
      }

      if (request.recomendada !== undefined) {
        if (request.recomendada) {
          capaExistente.marcarComoRecomendada();
        } else {
          capaExistente.desmarcarComoRecomendada();
        }
      }

      // Persiste as alterações
      await this.capaRepository.update(capaExistente);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao editar capa: ${error}`);
    }
  }
}
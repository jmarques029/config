import { CapaRepository } from '../repositories/CapaRepository';

export class ExcluirCapa {
  constructor(private readonly capaRepository: CapaRepository) {}

  async execute(id: string): Promise<void> {
    // Validação de entrada
    if (!id || id.trim() === '') {
      throw new Error('ID da capa é obrigatório');
    }

    try {
      // Verifica se a capa existe
      const capaExistente = await this.capaRepository.exists(id);
      if (!capaExistente) {
        throw new Error(`Capa com ID ${id} não encontrada`);
      }

      // Remove a capa
      await this.capaRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao excluir capa: ${error}`);
    }
  }

  async executeComConfirmacao(id: string, confirmacao: boolean): Promise<void> {
    if (!confirmacao) {
      throw new Error('Exclusão cancelada pelo usuário');
    }

    await this.execute(id);
  }
}
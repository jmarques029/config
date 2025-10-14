export class Categoria {
  private constructor(
    private readonly _id: string,
    private _nome: string,
    private _descricao: string,
    private _ativa: boolean = true,
    private _dataCreated: Date = new Date()
  ) {}

  static create(
    id: string,
    nome: string,
    descricao: string = ''
  ): Categoria {
    if (!id || id.trim() === '') {
      throw new Error('ID da categoria é obrigatório');
    }
    if (!nome || nome.trim() === '') {
      throw new Error('Nome da categoria é obrigatório');
    }

    return new Categoria(id, nome, descricao);
  }

  static fromPrimitives(data: {
    id: string;
    nome: string;
    descricao: string;
    ativa?: boolean;
    dataCreated?: Date;
  }): Categoria {
    return new Categoria(
      data.id,
      data.nome,
      data.descricao,
      data.ativa ?? true,
      data.dataCreated || new Date()
    );
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get descricao(): string {
    return this._descricao;
  }

  get ativa(): boolean {
    return this._ativa;
  }

  get dataCreated(): Date {
    return this._dataCreated;
  }

  updateNome(novoNome: string): void {
    if (!novoNome || novoNome.trim() === '') {
      throw new Error('Nome da categoria não pode ser vazio');
    }
    this._nome = novoNome;
  }

  updateDescricao(novaDescricao: string): void {
    this._descricao = novaDescricao;
  }

  ativar(): void {
    this._ativa = true;
  }

  desativar(): void {
    this._ativa = false;
  }

  toPrimitives(): {
    id: string;
    nome: string;
    descricao: string;
    ativa: boolean;
    dataCreated: Date;
  } {
    return {
      id: this._id,
      nome: this._nome,
      descricao: this._descricao,
      ativa: this._ativa,
      dataCreated: this._dataCreated
    };
  }
}
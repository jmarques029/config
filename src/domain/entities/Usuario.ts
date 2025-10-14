export class Usuario {
  private constructor(
    private readonly _id: string,
    private _nome: string,
    private _email: string,
    private _tipo: 'admin' | 'cliente',
    private _ativo: boolean = true,
    private _dataCreated: Date = new Date()
  ) {}

  static create(
    id: string,
    nome: string,
    email: string,
    tipo: 'admin' | 'cliente' = 'cliente'
  ): Usuario {
    if (!id || id.trim() === '') {
      throw new Error('ID do usuário é obrigatório');
    }
    if (!nome || nome.trim() === '') {
      throw new Error('Nome do usuário é obrigatório');
    }
    if (!email || email.trim() === '') {
      throw new Error('Email do usuário é obrigatório');
    }
    if (!Usuario.isValidEmail(email)) {
      throw new Error('Email inválido');
    }

    return new Usuario(id, nome, email, tipo);
  }

  static fromPrimitives(data: {
    id: string;
    nome: string;
    email: string;
    tipo: 'admin' | 'cliente';
    ativo?: boolean;
    dataCreated?: Date;
  }): Usuario {
    return new Usuario(
      data.id,
      data.nome,
      data.email,
      data.tipo,
      data.ativo ?? true,
      data.dataCreated || new Date()
    );
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get email(): string {
    return this._email;
  }

  get tipo(): 'admin' | 'cliente' {
    return this._tipo;
  }

  get ativo(): boolean {
    return this._ativo;
  }

  get dataCreated(): Date {
    return this._dataCreated;
  }

  isAdmin(): boolean {
    return this._tipo === 'admin';
  }

  isCliente(): boolean {
    return this._tipo === 'cliente';
  }

  updateNome(novoNome: string): void {
    if (!novoNome || novoNome.trim() === '') {
      throw new Error('Nome do usuário não pode ser vazio');
    }
    this._nome = novoNome;
  }

  updateEmail(novoEmail: string): void {
    if (!novoEmail || novoEmail.trim() === '') {
      throw new Error('Email do usuário não pode ser vazio');
    }
    if (!Usuario.isValidEmail(novoEmail)) {
      throw new Error('Email inválido');
    }
    this._email = novoEmail;
  }

  ativar(): void {
    this._ativo = true;
  }

  desativar(): void {
    this._ativo = false;
  }

  toPrimitives(): {
    id: string;
    nome: string;
    email: string;
    tipo: 'admin' | 'cliente';
    ativo: boolean;
    dataCreated: Date;
  } {
    return {
      id: this._id,
      nome: this._nome,
      email: this._email,
      tipo: this._tipo,
      ativo: this._ativo,
      dataCreated: this._dataCreated
    };
  }
}
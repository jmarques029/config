import { Rating } from '../value-objects/Rating';
import { PrecoValue } from '../value-objects/PrecoValue';
import { ImagemValue } from '../value-objects/ImagemValue';

export class Capa {
  private constructor(
    private readonly _id: string,
    private _nome: string,
    private _imagem: ImagemValue,
    private _rating: Rating,
    private _preco: PrecoValue,
    private _categoria: string,
    private _popular: boolean = false,
    private _recomendada: boolean = false,
    private _dataCreated: Date = new Date()
  ) {}

  static create(
    id: string,
    nome: string,
    imagem: ImagemValue,
    rating: Rating,
    preco: PrecoValue,
    categoria: string,
    popular: boolean = false,
    recomendada: boolean = false
  ): Capa {
    if (!id || id.trim() === '') {
      throw new Error('ID da capa é obrigatório');
    }
    if (!nome || nome.trim() === '') {
      throw new Error('Nome da capa é obrigatório');
    }
    if (!categoria || categoria.trim() === '') {
      throw new Error('Categoria da capa é obrigatória');
    }

    return new Capa(id, nome, imagem, rating, preco, categoria, popular, recomendada);
  }

  static fromPrimitives(data: {
    id: string;
    nome: string;
    imagemUrl: string;
    rating: number;
    preco: number;
    categoria: string;
    popular?: boolean;
    recomendada?: boolean;
    dataCreated?: Date;
  }): Capa {
    return new Capa(
      data.id,
      data.nome,
      ImagemValue.create(data.imagemUrl),
      Rating.create(data.rating),
      PrecoValue.create(data.preco),
      data.categoria,
      data.popular || false,
      data.recomendada || false,
      data.dataCreated || new Date()
    );
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get imagem(): ImagemValue {
    return this._imagem;
  }

  get rating(): Rating {
    return this._rating;
  }

  get preco(): PrecoValue {
    return this._preco;
  }

  get categoria(): string {
    return this._categoria;
  }

  get popular(): boolean {
    return this._popular;
  }

  get recomendada(): boolean {
    return this._recomendada;
  }

  get dataCreated(): Date {
    return this._dataCreated;
  }

  updateNome(novoNome: string): void {
    if (!novoNome || novoNome.trim() === '') {
      throw new Error('Nome da capa não pode ser vazio');
    }
    this._nome = novoNome;
  }

  updateImagem(novaImagem: ImagemValue): void {
    this._imagem = novaImagem;
  }

  updateRating(novoRating: Rating): void {
    this._rating = novoRating;
  }

  updatePreco(novoPreco: PrecoValue): void {
    this._preco = novoPreco;
  }

  marcarComoPopular(): void {
    this._popular = true;
  }

  desmarcarComoPopular(): void {
    this._popular = false;
  }

  marcarComoRecomendada(): void {
    this._recomendada = true;
  }

  desmarcarComoRecomendada(): void {
    this._recomendada = false;
  }

  toPrimitives(): {
    id: string;
    nome: string;
    imagemUrl: string;
    rating: number;
    preco: number;
    categoria: string;
    popular: boolean;
    recomendada: boolean;
    dataCreated: Date;
  } {
    return {
      id: this._id,
      nome: this._nome,
      imagemUrl: this._imagem.value,
      rating: this._rating.value,
      preco: this._preco.value,
      categoria: this._categoria,
      popular: this._popular,
      recomendada: this._recomendada,
      dataCreated: this._dataCreated
    };
  }
}
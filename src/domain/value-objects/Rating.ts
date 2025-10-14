export class Rating {
  private static readonly MIN_VALUE = 0;
  private static readonly MAX_VALUE = 5;

  private constructor(private readonly _value: number) {}

  static create(value: number): Rating {
    if (value < Rating.MIN_VALUE || value > Rating.MAX_VALUE) {
      throw new Error(`Rating deve estar entre ${Rating.MIN_VALUE} e ${Rating.MAX_VALUE}`);
    }
    if (!Number.isInteger(value)) {
      throw new Error('Rating deve ser um número inteiro');
    }

    return new Rating(value);
  }

  static fromStars(stars: string): Rating {
    // Conta o número de estrelas cheias no formato "★★★★☆"
    const fullStars = (stars.match(/★/g) || []).length;
    return Rating.create(fullStars);
  }

  get value(): number {
    return this._value;
  }

  toStars(): string {
    const fullStars = '★'.repeat(this._value);
    const emptyStars = '☆'.repeat(Rating.MAX_VALUE - this._value);
    return fullStars + emptyStars;
  }

  isMaxRating(): boolean {
    return this._value === Rating.MAX_VALUE;
  }

  isMinRating(): boolean {
    return this._value === Rating.MIN_VALUE;
  }

  equals(other: Rating): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this.toStars();
  }
}
export class PrecoValue {
  private static readonly MIN_VALUE = 0;

  private constructor(private readonly _value: number) {}

  static create(value: number): PrecoValue {
    if (value < PrecoValue.MIN_VALUE) {
      throw new Error('Preço não pode ser negativo');
    }
    if (!Number.isFinite(value)) {
      throw new Error('Preço deve ser um número válido');
    }

    // Arredonda para 2 casas decimais
    const roundedValue = Math.round(value * 100) / 100;
    return new PrecoValue(roundedValue);
  }

  static fromString(priceString: string): PrecoValue {
    // Remove símbolos de moeda e espaços, ex: "R$ 25,90" -> "25.90"
    const cleanPrice = priceString
      .replace(/[R$\s]/g, '')
      .replace(',', '.');
    
    const numericValue = parseFloat(cleanPrice);
    
    if (isNaN(numericValue)) {
      throw new Error('Formato de preço inválido');
    }

    return PrecoValue.create(numericValue);
  }

  get value(): number {
    return this._value;
  }

  isFree(): boolean {
    return this._value === 0;
  }

  toReal(): string {
    return `R$ ${this._value.toFixed(2).replace('.', ',')}`;
  }

  toDolar(): string {
    // Conversão aproximada (em um sistema real, seria via API)
    const dollarValue = this._value / 5.5;
    return `$${dollarValue.toFixed(2)}`;
  }

  add(other: PrecoValue): PrecoValue {
    return PrecoValue.create(this._value + other._value);
  }

  subtract(other: PrecoValue): PrecoValue {
    return PrecoValue.create(this._value - other._value);
  }

  multiply(factor: number): PrecoValue {
    return PrecoValue.create(this._value * factor);
  }

  applyDiscount(percentage: number): PrecoValue {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Percentual de desconto deve estar entre 0 e 100');
    }
    
    const discountValue = this._value * (percentage / 100);
    return PrecoValue.create(this._value - discountValue);
  }

  equals(other: PrecoValue): boolean {
    return Math.abs(this._value - other._value) < 0.01; // Tolerância para comparação de ponto flutuante
  }

  isGreaterThan(other: PrecoValue): boolean {
    return this._value > other._value;
  }

  isLessThan(other: PrecoValue): boolean {
    return this._value < other._value;
  }

  toString(): string {
    return this.toReal();
  }
}
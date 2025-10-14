export class ImagemValue {
  private static readonly ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  private static readonly MAX_URL_LENGTH = 2048;

  private constructor(private readonly _value: string) {}

  static create(url: string): ImagemValue {
    if (!url || url.trim() === '') {
      throw new Error('URL da imagem é obrigatória');
    }

    const trimmedUrl = url.trim();

    if (trimmedUrl.length > ImagemValue.MAX_URL_LENGTH) {
      throw new Error(`URL da imagem muito longa. Máximo: ${ImagemValue.MAX_URL_LENGTH} caracteres`);
    }

    if (!ImagemValue.isValidUrl(trimmedUrl)) {
      throw new Error('URL da imagem inválida');
    }

    if (!ImagemValue.hasValidExtension(trimmedUrl)) {
      throw new Error(`Extensão de imagem não suportada. Permitidas: ${ImagemValue.ALLOWED_EXTENSIONS.join(', ')}`);
    }

    return new ImagemValue(trimmedUrl);
  }

  static createFromRelativePath(relativePath: string): ImagemValue {
    if (!relativePath || relativePath.trim() === '') {
      throw new Error('Caminho relativo da imagem é obrigatório');
    }

    const trimmedPath = relativePath.trim();
    
    // Para caminhos relativos, não validamos como URL completa
    if (!ImagemValue.hasValidExtension(trimmedPath)) {
      throw new Error(`Extensão de imagem não suportada. Permitidas: ${ImagemValue.ALLOWED_EXTENSIONS.join(', ')}`);
    }

    return new ImagemValue(trimmedPath);
  }

  private static isValidUrl(url: string): boolean {
    try {
      // Aceita URLs completas ou caminhos relativos
      return url.startsWith('http://') || 
             url.startsWith('https://') || 
             url.startsWith('./') ||
             url.startsWith('/') ||
             !url.includes('://'); // Para caminhos relativos simples
    } catch {
      return false;
    }
  }

  private static hasValidExtension(url: string): boolean {
    const lowerUrl = url.toLowerCase();
    return ImagemValue.ALLOWED_EXTENSIONS.some(ext => lowerUrl.endsWith(ext));
  }

  get value(): string {
    return this._value;
  }

  getFileName(): string {
    const urlParts = this._value.split('/');
    return urlParts[urlParts.length - 1];
  }

  getExtension(): string {
    const fileName = this.getFileName();
    const dotIndex = fileName.lastIndexOf('.');
    return dotIndex !== -1 ? fileName.substring(dotIndex) : '';
  }

  isRelativePath(): boolean {
    return this._value.startsWith('./') || 
           this._value.startsWith('/') ||
           (!this._value.startsWith('http://') && !this._value.startsWith('https://'));
  }

  isAbsoluteUrl(): boolean {
    return this._value.startsWith('http://') || this._value.startsWith('https://');
  }

  toAbsoluteUrl(baseUrl: string): string {
    if (this.isAbsoluteUrl()) {
      return this._value;
    }

    // Remove trailing slash do baseUrl se existir
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    if (this._value.startsWith('./')) {
      return `${cleanBaseUrl}/${this._value.substring(2)}`;
    }
    
    if (this._value.startsWith('/')) {
      return `${cleanBaseUrl}${this._value}`;
    }

    return `${cleanBaseUrl}/${this._value}`;
  }

  equals(other: ImagemValue): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
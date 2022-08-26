export class HelloService {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  hello(): string {
    return `Hello, ${this.#name}`;
  }
}

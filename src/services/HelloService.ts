export class HelloService {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  hello() {
    return `Hello, ${this.#name}`;
  }
}

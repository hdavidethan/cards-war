export default class Player {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  name() {
    return this.#name;
  }
}

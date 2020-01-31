export class Player {
  id;
  color;

  constructor(id = 0, color = '#FFF') {
    this.id = id;
    this.color = color;
  }

  isEmpty() {
    return this.id === 0;
  }
}

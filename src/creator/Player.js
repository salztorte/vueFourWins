export class Player {
  id;
  color;
  name;

  constructor(id = 0, color = '#FFF') {
    this.id = id;
    this.color = color;
    this.name = `Player${this.id}`;
  }

  get isEmpty() {
    return this.id === 0;
  }
}

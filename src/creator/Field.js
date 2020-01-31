import {Player} from "./Player";

export class Position {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get left() {
    return new Position(this.x - 1, this.y)
  }

  get right() {
    return new Position(this.x + 1, this.y)
  }

  get down() {
    return new Position(this.x, this.y + 1)
  }

  get up() {
    return new Position(this.x, this.y - 1)
  }

  get leftUp() {
    return new Position(this.x - 1, this.y - 1);
  }

  get rightDown() {
    return new Position(this.x + 1, this.y + 1)
  }

  get leftDown() {
    return new Position(this.x - 1, this.y + 1);
  }

  get rightUp() {
    return new Position(this.x + 1, this.y - 1)
  }
}


export class Cell extends Position {
  player = new Player();

  constructor(x, y) {
    super(x, y)
  }

  reset() {
    this.player = new Player();
  }
}


export class Field {
  _field;

  constructor(width = 7, height = 7) {
    this._field = new Array(height).fill().map((_, y) => new Array(width).fill().map((_, x) => new Cell(x, y)));
  }


  reset() {
    this._field.map(row => row.map(cell => cell.reset()));
  }

  findDeepestCell(cell) {
    if (cell.y === this._field.length - 1) return cell;
    const nextCell = this._field[cell.y + 1][cell.x];
    if (!nextCell.player.isEmpty()) return cell;

    return this.findDeepestCell(nextCell);
  }


  getCellFromPosition(pos) {
    return this._field[pos.y][pos.x];
  }

  horizontalStreak(cell, player) {
    const left = this.countCoinStreaks(cell, player, c => c.left);
    const right = this.countCoinStreaks(cell, player, c => c.right);
    return left + right + 1;
  }

  verticalStreak(cell, player) {
    const up = this.countCoinStreaks(cell, player, c => c.up);
    const down = this.countCoinStreaks(cell, player, c => c.down);
    return up + down + 1;
  }


  diagonalRightUpStreak(cell, player) {
    const rightUp = this.countCoinStreaks(cell, player, c => c.rightUp);
    const leftDown = this.countCoinStreaks(cell, player, c => c.leftDown);
    return leftDown + rightUp + 1;
  }

  diagonalLeftUpStreak(cell, player) {
    const rightDown = this.countCoinStreaks(cell, player, c => c.rightDown);
    const leftUp = this.countCoinStreaks(cell, player, c => c.leftUp);
    return leftUp + rightDown + 1;
  }


  countCoinStreaks(pos, player, block) {
    const newPos = block(pos);
    if (newPos.y < 0 || newPos.y >= this._field.length) return 0;
    if (newPos.x < 0 || newPos.x >= this._field[newPos.y].length) return 0;

    const field = this.getCellFromPosition(newPos);
    if (field.player !== player) return 0;
    return 1 + this.countCoinStreaks(newPos, player, block);
  }
}

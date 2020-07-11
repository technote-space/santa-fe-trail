import {Field} from './Field';

export class Agent {
  constructor(private field: Field) {
  }

  private _posX = 0; // eslint-disable-line no-magic-numbers
  private _posY = 0; // eslint-disable-line no-magic-numbers
  private _dirX = 1; // eslint-disable-line no-magic-numbers
  private _dirY = 0; // eslint-disable-line no-magic-numbers

  public get posX(): number {
    return this._posX;
  }

  public get posY(): number {
    return this._posY;
  }

  public get frontX(): number {
    return this.posX + this.dirX;
  }

  public get frontY(): number {
    return this.posY + this.dirY;
  }

  public get dirX(): number {
    return this._dirX;
  }

  public get dirY(): number {
    return this._dirY;
  }

  private setDir(dirX: number, dirY: number): void {
    this._dirX = dirX;
    this._dirY = dirY;
  }

  public goForward(): void {
    this._posX = Math.min(Math.max(0, this._posX + this._dirX), Field.width - 1); // eslint-disable-line no-magic-numbers
    this._posY = Math.min(Math.max(0, this._posY + this._dirY), Field.height - 1); // eslint-disable-line no-magic-numbers
    this.field.onVisited(this.posX, this.posY);
  }

  public turnRight(): void {
    // noinspection JSSuspiciousNameCombination
    this.setDir(-this.dirY, this.dirX);
  }

  public turnLeft(): void {
    // noinspection JSSuspiciousNameCombination
    this.setDir(this.dirY, -this.dirX);
  }
}

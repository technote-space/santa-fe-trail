import {positionToIndex} from './helper';
import {FieldFlags} from './types';
import {WIDTH, HEIGHT, COUNT, FIELD} from './constant';

export class Field {
  private _field: { [key: number]: FieldFlags } = {};

  // eslint-disable-next-line no-magic-numbers
  private _foods    = 0;
  // eslint-disable-next-line no-magic-numbers
  private _ateCount = 0;
  // eslint-disable-next-line no-magic-numbers
  private _visited  = 0;

  constructor() {
    this.init();
  }

  private init() {
    this._foods    = 0;
    this._ateCount = 0;
    this._visited  = 0;
    this._field    = {...FIELD};
    this._foods    = COUNT;
  }

  public static get width(): number {
    return WIDTH;
  }

  public static get height(): number {
    return HEIGHT;
  }

  public get rest(): number {
    return this._foods - this._ateCount;
  }

  public get isFinished(): boolean {
    // eslint-disable-next-line no-magic-numbers
    return this.rest <= 0;
  }

  private setFlag(posX: number, posY: number, flag: number): void {
    this._field[positionToIndex(posX, posY, WIDTH)] = flag;
  }

  public getFlag(posX: number, posY: number): FieldFlags {
    const index = positionToIndex(posX, posY, WIDTH);
    if (index in this._field) {
      return this._field[index];
    }

    return FieldFlags.None;
  }

  private addFlag(posX: number, posY: number, flag: number): void {
    this.setFlag(posX, posY, this.getFlag(posX, posY) | flag);
  }

  public is(posX: number, posY: number, flag: number): boolean {
    return (this.getFlag(posX, posY) & flag) === flag;
  }

  private onFood(posX: number, posY: number): void {
    this.addFlag(posX, posY, FieldFlags.Food);
  }

  public onVisited(posX: number, posY: number): void {
    if (!this.is(posX, posY, FieldFlags.Visited)) {
      this.addFlag(posX, posY, FieldFlags.Visited);
      this._visited++;
      if (this.is(posX, posY, FieldFlags.Food)) {
        this._ateCount++;
      }
    }
  }

  public getFitness(): number {
    const fitness = this._ateCount / this._foods;
    if (fitness >= 1) { // eslint-disable-line no-magic-numbers
      return fitness;
    }

    return fitness - 0.01 / (this._visited + 1); // eslint-disable-line no-magic-numbers
  }
}

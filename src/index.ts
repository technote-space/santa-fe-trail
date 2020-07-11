import {GameBase, IGame, GaSettings, GameSettings} from '@technote-space/game-interface';
import {Field} from './Field';
import {Agent} from './Agent';
import {FieldFlags} from './types';
import {CHIP_SIZE, ENERGY} from './constant';

export default class Game extends GameBase {
  private readonly field: Field;
  private readonly agent: Agent;

  constructor() {
    super();

    this.field = new Field();
    this.agent = new Agent(this.field);
  }

  public clone(): IGame {
    return new Game();
  }

  protected getGaSettings(): GaSettings {
    return {
      nodeCount: 50,
    };
  }

  protected getGameSettings(): GameSettings {
    return {
      width: Field.width * CHIP_SIZE,
      height: Field.height * CHIP_SIZE,
      fps: 10,
      actionLimit: ENERGY,
      perceptionNumber: 1,
      actionNumber: 3,
    };
  }

  protected async performAction(index: number): Promise<void> {
    switch (index) {
      case 0: // eslint-disable-line no-magic-numbers
        this.agent.goForward();
        if (this.field.isFinished) {
          this.onFinished();
        }
        break;
      case 1: // eslint-disable-line no-magic-numbers
        this.agent.turnLeft();
        break;
      case 2: // eslint-disable-line no-magic-numbers
        this.agent.turnRight();
        break;
      default:
        break;
    }

    if (this.gameSettings.actionLimit - this.step < this.field.rest) {
      this.onFinished();
    }
  }

  public actionExpression(index: number): string {
    switch (index) {
      case 0: // eslint-disable-line no-magic-numbers
        return '前進';
      case 1: // eslint-disable-line no-magic-numbers
        return '左回転';
      case 2: // eslint-disable-line no-magic-numbers
        return '右回転';
      default:
        return '';
    }
  }

  protected async performPerceive(index: number): Promise<boolean> | never {
    // eslint-disable-next-line no-magic-numbers
    if (index === 0) {
      return this.field.is(this.agent.frontX, this.agent.frontY, FieldFlags.Food);
    }

    throw new Error('invalid index');
  }

  public perceiveExpression(index: number): string {
    // eslint-disable-next-line no-magic-numbers
    if (index === 0) {
      return '餌';
    }

    return super.perceiveExpression(index);
  }

  protected performGetFitness(): number {
    return this.field.getFitness();
  }
}

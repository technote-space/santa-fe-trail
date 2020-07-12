import {GameBase, IGame, GaSettings, GameSettings} from '@technote-space/game-interface';
import {Field} from './Field';
import {Agent} from './Agent';
import {FieldFlags} from './types';
import {CHIP_SIZE, ENERGY, COLORS} from './constant';

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
      return this.field.is(this.agent.frontX, this.agent.frontY, FieldFlags.Food) && !this.field.is(this.agent.frontX, this.agent.frontY, FieldFlags.Visited);
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

  protected performDraw(context: CanvasRenderingContext2D): void {
    // eslint-disable-next-line no-magic-numbers,id-length
    for (let y = Field.height; --y >= 0;) {
      // eslint-disable-next-line no-magic-numbers,id-length
      for (let x = Field.width; --x >= 0;) {
        const color       = COLORS[this.field.getFlag(x, y)];
        context.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
        context.fillRect(x * CHIP_SIZE, y * CHIP_SIZE, CHIP_SIZE, CHIP_SIZE);
      }
    }

    context.fillStyle = 'rgb(52, 153, 102)';
    if (this.agent.dirX) {
      const x1 = this.agent.posX * CHIP_SIZE + (1 - this.agent.dirX) * CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const x2 = this.agent.posX * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const y1 = this.agent.posY * CHIP_SIZE + CHIP_SIZE / 3; // eslint-disable-line no-magic-numbers
      const y2 = this.agent.posY * CHIP_SIZE + CHIP_SIZE / 3 * 2; // eslint-disable-line no-magic-numbers
      context.fillRect(x1, y1, x2 - x1, y2 - y1);

      const px1 = this.agent.posX * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const py1 = this.agent.posY * CHIP_SIZE;
      const px2 = this.agent.posX * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const py2 = this.agent.posY * CHIP_SIZE + CHIP_SIZE;
      const px3 = this.agent.posX * CHIP_SIZE + (1 + this.agent.dirX) * CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const py3 = this.agent.posY * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      context.beginPath();
      context.moveTo(px1, py1);
      context.lineTo(px2, py2);
      context.lineTo(px3, py3);
      context.fill();
    } else {
      const x1 = this.agent.posX * CHIP_SIZE + CHIP_SIZE / 3; // eslint-disable-line no-magic-numbers
      const x2 = this.agent.posX * CHIP_SIZE + CHIP_SIZE / 3 * 2; // eslint-disable-line no-magic-numbers
      const y1 = this.agent.posY * CHIP_SIZE + (1 - this.agent.dirY) * CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const y2 = this.agent.posY * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      context.fillRect(x1, y1, x2 - x1, y2 - y1);

      const px1 = this.agent.posX * CHIP_SIZE;
      const py1 = this.agent.posY * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const px2 = this.agent.posX * CHIP_SIZE + CHIP_SIZE; // eslint-disable-line no-magic-numbers
      const py2 = this.agent.posY * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const px3 = this.agent.posX * CHIP_SIZE + CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      const py3 = this.agent.posY * CHIP_SIZE + (1 + this.agent.dirY) * CHIP_SIZE / 2; // eslint-disable-line no-magic-numbers
      context.beginPath();
      context.moveTo(px1, py1);
      context.lineTo(px2, py2);
      context.lineTo(px3, py3);
      context.fill();
    }
  }
}

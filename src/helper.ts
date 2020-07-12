import {WIDTH} from './constant';

export const positionToIndex = (posX: number, posY: number): number => posX + WIDTH * posY;

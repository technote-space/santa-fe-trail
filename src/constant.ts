/* eslint-disable no-magic-numbers */
import {FieldFlags} from './types';
import {positionToIndex} from './helper';

export const NAME       = 'Santa Fe Trail';
export const WIDTH      = 32;
export const HEIGHT     = 32;
export const FOODS_POS  = [
  [1, 0],
  [2, 0],
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [8, 5],
  [9, 5],
  [10, 5],
  [11, 5],
  [12, 5],
  [12, 6],
  [12, 7],
  [12, 8],
  [12, 9],
  [12, 10],
  [12, 12],
  [12, 13],
  [12, 14],
  [12, 15],
  [12, 18],
  [12, 19],
  [12, 20],
  [12, 21],
  [12, 22],
  [12, 23],
  [11, 24],
  [10, 24],
  [9, 24],
  [8, 24],
  [7, 24],
  [4, 24],
  [3, 24],
  [1, 25],
  [1, 26],
  [1, 27],
  [1, 28],
  [2, 30],
  [3, 30],
  [4, 30],
  [5, 30],
  [7, 29],
  [7, 28],
  [8, 27],
  [9, 27],
  [10, 27],
  [11, 27],
  [12, 27],
  [13, 27],
  [14, 27],
  [16, 26],
  [16, 25],
  [16, 24],
  [16, 21],
  [16, 20],
  [16, 19],
  [16, 18],
  [17, 15],
  [20, 14],
  [20, 13],
  [20, 10],
  [20, 9],
  [20, 8],
  [20, 7],
  [21, 5],
  [22, 5],
  [24, 4],
  [24, 3],
  [25, 2],
  [26, 2],
  [27, 2],
  [29, 3],
  [29, 4],
  [29, 6],
  [29, 9],
  [29, 12],
  [28, 14],
  [27, 14],
  [26, 14],
  [23, 15],
  [24, 18],
  [27, 19],
  [26, 22],
  [23, 23],
];
export const FIELD      = Object.assign({}, ...FOODS_POS.map(([posX, posY]) => positionToIndex(posX, posY, WIDTH)).map(index => ({[index]: FieldFlags.Food})));
export const COUNT      = FOODS_POS.length;
export const ENERGY     = 400;
export const STEP_LIMIT = ENERGY * 2;
export const CHIP_SIZE  = 24;
export const FPS        = 8;
export const COLORS     = {
  [FieldFlags.None]: [200, 200, 200],
  [FieldFlags.Food]: [255, 228, 51],
  [FieldFlags.Visited]: [102, 51, 255],
  [FieldFlags.Food | FieldFlags.Visited]: [204, 102, 204],
};

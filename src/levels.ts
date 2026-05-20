
import { Level } from './types';

export const levels: Level[] = [
  {
    id: 1,
    name: "初识光芒",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 180, angle: 0, width: 35, height: 35, draggable: false, color: 'yellow' },
      { id: 'mirror1', type: 'mirror', x: 280, y: 250, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 150, y: 50, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' }
    ]
  },
  {
    id: 2,
    name: "双重反射",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 80, angle: 0, width: 35, height: 35, draggable: false, color: 'blue' },
      { id: 'mirror1', type: 'mirror', x: 300, y: 100, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'mirror2', type: 'mirror', x: 250, y: 280, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 100, y: 260, angle: 0, width: 40, height: 40, draggable: false, color: 'blue' }
    ]
  },
  {
    id: 3,
    name: "色彩挑战",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 280, angle: 0, width: 35, height: 35, draggable: false, color: 'white' },
      { id: 'filter1', type: 'colorFilter', x: 280, y: 200, angle: 0, width: 25, height: 45, draggable: true, filterColor: 'red' },
      { id: 'mirror1', type: 'mirror', x: 320, y: 100, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 150, y: 100, angle: 0, width: 40, height: 40, draggable: false, color: 'red' }
    ]
  },
  {
    id: 4,
    name: "分光之路",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 200, angle: 0, width: 35, height: 35, draggable: false, color: 'yellow' },
      { id: 'splitter1', type: 'splitter', x: 300, y: 200, angle: 0, width: 35, height: 35, draggable: true },
      { id: 'mirror1', type: 'mirror', x: 300, y: 60, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 150, y: 60, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' },
      { id: 'target2', type: 'target', x: 150, y: 300, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' }
    ]
  },
  {
    id: 5,
    name: "光学迷宫",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 300, angle: 0, width: 35, height: 35, draggable: false, color: 'green' },
      { id: 'mirror1', type: 'mirror', x: 100, y: 100, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'mirror2', type: 'mirror', x: 200, y: 200, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'mirror3', type: 'mirror', x: 300, y: 100, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'mirror4', type: 'mirror', x: 350, y: 250, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 360, y: 50, angle: 0, width: 40, height: 40, draggable: false, color: 'green' }
    ]
  }
];

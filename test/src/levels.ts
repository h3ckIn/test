import { Level } from './types';

export const levels: Level[] = [
  {
    id: 1,
    name: "初识光芒",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 180, angle: 0, width: 35, height: 35, draggable: false, color: 'yellow' },
      { id: 'obstacle1', type: 'obstacle', x: 180, y: 120, angle: 0, width: 30, height: 60, draggable: false },
      { id: 'mirror1', type: 'mirror', x: 280, y: 250, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 150, y: 50, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' }
    ]
  },
  {
    id: 2,
    name: "双重反射",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 80, angle: 0, width: 35, height: 35, draggable: false, color: 'blue' },
      { id: 'obstacle1', type: 'obstacle', x: 180, y: 150, angle: 0, width: 80, height: 30, draggable: false },
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
      { id: 'obstacle1', type: 'obstacle', x: 180, y: 200, angle: 0, width: 30, height: 80, draggable: false },
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
      { id: 'obstacle1', type: 'obstacle', x: 200, y: 200, angle: 0, width: 40, height: 40, draggable: false },
      { id: 'splitter1', type: 'splitter', x: 300, y: 200, angle: 0, width: 35, height: 35, draggable: true },
      { id: 'mirror1', type: 'mirror', x: 300, y: 60, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 150, y: 60, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' },
      { id: 'target2', type: 'target', x: 150, y: 280, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' }
    ]
  },
  {
    id: 5,
    name: "透镜聚焦",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 180, angle: 0, width: 35, height: 35, draggable: false, color: 'green' },
      { id: 'obstacle1', type: 'obstacle', x: 150, y: 100, angle: 0, width: 30, height: 100, draggable: false },
      { id: 'lens1', type: 'lens', x: 250, y: 180, angle: 0, width: 45, height: 35, draggable: true, focalLength: 50 },
      { id: 'target1', type: 'target', x: 350, y: 180, angle: 0, width: 40, height: 40, draggable: false, color: 'green' }
    ]
  },
  {
    id: 6,
    name: "双向迷镜",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 100, angle: 0, width: 35, height: 35, draggable: false, color: 'blue' },
      { id: 'twoWay1', type: 'twoWayMirror', x: 200, y: 100, angle: 90, width: 50, height: 10, draggable: true },
      { id: 'twoWay2', type: 'twoWayMirror', x: 200, y: 250, angle: 90, width: 50, height: 10, draggable: true },
      { id: 'mirror1', type: 'mirror', x: 320, y: 180, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 100, y: 250, angle: 0, width: 40, height: 40, draggable: false, color: 'blue' }
    ]
  },
  {
    id: 7,
    name: "光束分离",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 180, angle: 0, width: 35, height: 35, draggable: false, color: 'white' },
      { id: 'beamSplitter1', type: 'beamSplitter', x: 200, y: 180, angle: 45, width: 40, height: 40, draggable: true },
      { id: 'filter1', type: 'colorFilter', x: 300, y: 100, angle: 0, width: 25, height: 45, draggable: true, filterColor: 'red' },
      { id: 'filter2', type: 'colorFilter', x: 300, y: 260, angle: 0, width: 25, height: 45, draggable: true, filterColor: 'blue' },
      { id: 'target1', type: 'target', x: 360, y: 100, angle: 0, width: 40, height: 40, draggable: false, color: 'red' },
      { id: 'target2', type: 'target', x: 360, y: 260, angle: 0, width: 40, height: 40, draggable: false, color: 'blue' }
    ]
  },
  {
    id: 8,
    name: "探测器挑战",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 80, angle: 0, width: 35, height: 35, draggable: false, color: 'yellow' },
      { id: 'mirror1', type: 'mirror', x: 180, y: 80, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'mirror2', type: 'mirror', x: 180, y: 270, angle: 0, width: 50, height: 10, draggable: true },
      { id: 'detector1', type: 'lightDetector', x: 300, y: 80, angle: 0, width: 35, height: 35, draggable: false },
      { id: 'detector2', type: 'lightDetector', x: 300, y: 270, angle: 0, width: 35, height: 35, draggable: false },
      { id: 'target1', type: 'target', x: 360, y: 180, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' }
    ]
  },
  {
    id: 9,
    name: "棱镜折射",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 180, angle: 0, width: 35, height: 35, draggable: false, color: 'white' },
      { id: 'prism1', type: 'prism', x: 200, y: 180, angle: 0, width: 40, height: 50, draggable: true },
      { id: 'filter1', type: 'colorFilter', x: 300, y: 120, angle: 0, width: 25, height: 45, draggable: true, filterColor: 'red' },
      { id: 'filter2', type: 'colorFilter', x: 300, y: 240, angle: 0, width: 25, height: 45, draggable: true, filterColor: 'blue' },
      { id: 'target1', type: 'target', x: 360, y: 120, angle: 0, width: 40, height: 40, draggable: false, color: 'red' },
      { id: 'target2', type: 'target', x: 360, y: 240, angle: 0, width: 40, height: 40, draggable: false, color: 'blue' }
    ]
  },
  {
    id: 10,
    name: "终极挑战",
    elements: [
      { id: 'light1', type: 'lightSource', x: 40, y: 180, angle: 0, width: 35, height: 35, draggable: false, color: 'white' },
      { id: 'obstacle1', type: 'obstacle', x: 100, y: 100, angle: 0, width: 20, height: 120, draggable: false },
      { id: 'obstacle2', type: 'obstacle', x: 100, y: 230, angle: 0, width: 20, height: 120, draggable: false },
      { id: 'beamSplitter1', type: 'beamSplitter', x: 200, y: 180, angle: 0, width: 40, height: 40, draggable: true },
      { id: 'filter1', type: 'colorFilter', x: 300, y: 120, angle: 0, width: 25, height: 45, draggable: true, filterColor: 'green' },
      { id: 'filter2', type: 'colorFilter', x: 300, y: 240, angle: 0, width: 25, height: 45, draggable: true, filterColor: 'yellow' },
      { id: 'mirror1', type: 'mirror', x: 250, y: 60, angle: 45, width: 50, height: 10, draggable: true },
      { id: 'mirror2', type: 'mirror', x: 250, y: 300, angle: -45, width: 50, height: 10, draggable: true },
      { id: 'target1', type: 'target', x: 360, y: 60, angle: 0, width: 40, height: 40, draggable: false, color: 'green' },
      { id: 'target2', type: 'target', x: 360, y: 300, angle: 0, width: 40, height: 40, draggable: false, color: 'yellow' }
    ]
  }
];

export type ElementType = 'lightSource' | 'mirror' | 'prism' | 'target' | 'splitter' | 'colorFilter';
export type LightColor = 'red' | 'green' | 'blue' | 'yellow' | 'white';

export interface OpticalElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number;
  draggable: boolean;
  color?: LightColor;
  filterColor?: LightColor;
}

export interface Level {
  id: number;
  name: string;
  elements: OpticalElement[];
}

export interface LightRay {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: LightColor;
}

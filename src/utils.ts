
import { OpticalElement, LightRay, LightColor } from './types';

const toRadians = (angle: number) => (angle * Math.PI) / 180;
const toDegrees = (radians: number) => (radians * 180) / Math.PI;

const colorMap: Record<LightColor, string> = {
  red: '#ff4444',
  green: '#44ff44',
  blue: '#4488ff',
  yellow: '#ffdd44',
  white: '#ffffff'
};

export function calculateLightPath(
  elements: OpticalElement[],
  canvasWidth: number,
  canvasHeight: number
): { rays: LightRay[]; hitTargets: Set<string> } {
  const rays: LightRay[] = [];
  const hitTargets = new Set<string>();
  
  const lightSources = elements.filter(e => e.type === 'lightSource');
  
  for (const source of lightSources) {
    const color: LightColor = source.color || 'yellow';
    traceLightRay(source.x + source.width / 2, source.y, source.angle, color, 0);
  }
  
  function traceLightRay(startX: number, startY: number, angle: number, color: LightColor, bounces: number) {
    if (bounces > 10) return;
    
    const angleRad = toRadians(angle);
    const dirX = Math.cos(angleRad);
    const dirY = Math.sin(angleRad);
    
    let closestHit = null;
    let closestDist = Infinity;
    let hitElement = null;
    
    for (const element of elements) {
      if (Math.abs(element.x - startX) < 5 && Math.abs(element.y - startY) < 5) continue;
      
      let hit = null;
      
      if (element.type === 'mirror') {
        hit = rayMirrorIntersection(startX, startY, dirX, dirY, element);
      } else if (element.type === 'target' || element.type === 'splitter' || element.type === 'colorFilter') {
        hit = rayBoxIntersection(startX, startY, dirX, dirY, element);
      }
      
      if (hit && hit.distance < closestDist && hit.distance > 1) {
        closestDist = hit.distance;
        closestHit = hit;
        hitElement = element;
      }
    }
    
    const boundaryHit = rayBoundaryIntersection(startX, startY, dirX, dirY, canvasWidth, canvasHeight);
    if (boundaryHit && boundaryHit.distance < closestDist) {
      closestHit = boundaryHit;
      hitElement = null;
    }
    
    if (closestHit) {
      rays.push({
        startX,
        startY,
        endX: closestHit.x,
        endY: closestHit.y,
        color
      });
      
      if (hitElement) {
        if (hitElement.type === 'target') {
          const targetColor = hitElement.color || 'blue';
          if (targetColor === 'white' || targetColor === color || color === 'white') {
            hitTargets.add(hitElement.id);
          }
        } else if (hitElement.type === 'mirror') {
          const reflectedAngle = reflectAngle(angle, hitElement.angle);
          traceLightRay(closestHit.x, closestHit.y, reflectedAngle, color, bounces + 1);
        } else if (hitElement.type === 'splitter') {
          const reflectedAngle = reflectAngle(angle, hitElement.angle);
          traceLightRay(closestHit.x, closestHit.y, reflectedAngle, color, bounces + 1);
          traceLightRay(closestHit.x, closestHit.y, angle, color, bounces + 1);
        } else if (hitElement.type === 'colorFilter') {
          const filterColor = hitElement.filterColor || 'white';
          if (filterColor === 'white' || color === 'white' || color === filterColor) {
            traceLightRay(closestHit.x, closestHit.y, angle, filterColor === 'white' ? color : filterColor, bounces);
          }
        }
      }
    }
  }
  
  return { rays, hitTargets };
}

function rayMirrorIntersection(
  rayX: number, rayY: number, dirX: number, dirY: number,
  mirror: OpticalElement
) {
  const mirrorAngleRad = toRadians(mirror.angle);
  const halfWidth = mirror.width / 2;
  
  const x1 = mirror.x - Math.cos(mirrorAngleRad) * halfWidth;
  const y1 = mirror.y - Math.sin(mirrorAngleRad) * halfWidth;
  const x2 = mirror.x + Math.cos(mirrorAngleRad) * halfWidth;
  const y2 = mirror.y + Math.sin(mirrorAngleRad) * halfWidth;
  
  return lineLineIntersection(rayX, rayY, rayX + dirX * 1000, rayY + dirY * 1000, x1, y1, x2, y2);
}

function rayBoxIntersection(
  rayX: number, rayY: number, dirX: number, dirY: number,
  box: OpticalElement
) {
  const halfW = box.width / 2;
  const halfH = box.height / 2;
  
  const edges = [
    { x1: box.x - halfW, y1: box.y - halfH, x2: box.x + halfW, y2: box.y - halfH },
    { x1: box.x + halfW, y1: box.y - halfH, x2: box.x + halfW, y2: box.y + halfH },
    { x1: box.x + halfW, y1: box.y + halfH, x2: box.x - halfW, y2: box.y + halfH },
    { x1: box.x - halfW, y1: box.y + halfH, x2: box.x - halfW, y2: box.y - halfH }
  ];
  
  let closest = null;
  let minDist = Infinity;
  
  for (const edge of edges) {
    const hit = lineLineIntersection(
      rayX, rayY, rayX + dirX * 1000, rayY + dirY * 1000,
      edge.x1, edge.y1, edge.x2, edge.y2
    );
    if (hit && hit.distance < minDist) {
      minDist = hit.distance;
      closest = hit;
    }
  }
  
  return closest;
}

function rayBoundaryIntersection(
  rayX: number, rayY: number, dirX: number, dirY: number,
  width: number, height: number
) {
  const edges = [
    { x1: 0, y1: 0, x2: width, y2: 0 },
    { x1: width, y1: 0, x2: width, y2: height },
    { x1: width, y1: height, x2: 0, y2: height },
    { x1: 0, y1: height, x2: 0, y2: 0 }
  ];
  
  let closest = null;
  let minDist = Infinity;
  
  for (const edge of edges) {
    const hit = lineLineIntersection(
      rayX, rayY, rayX + dirX * 10000, rayY + dirY * 10000,
      edge.x1, edge.y1, edge.x2, edge.y2
    );
    if (hit && hit.distance < minDist) {
      minDist = hit.distance;
      closest = hit;
    }
  }
  
  return closest;
}

function lineLineIntersection(
  x1: number, y1: number, x2: number, y2: number,
  x3: number, y3: number, x4: number, y4: number
) {
  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  
  if (Math.abs(denom) < 0.0001) return null;
  
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
  
  if (t > 0 && t < 1 && u >= 0 && u <= 1) {
    const x = x1 + t * (x2 - x1);
    const y = y1 + t * (y2 - y1);
    const dx = x - x1;
    const dy = y - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return { x, y, distance };
  }
  
  return null;
}

function reflectAngle(incomingAngle: number, mirrorAngle: number): number {
  const normalAngle = mirrorAngle + 90;
  const reflectedAngle = 2 * normalAngle - incomingAngle;
  return reflectedAngle;
}

export { colorMap };

import React, { useRef, useEffect, useState } from 'react';
import { OpticalElement, LightRay, LightColor } from '../types';
import { calculateLightPath, colorMap } from '../utils';

interface GameCanvasProps {
  elements: OpticalElement[];
  onElementsChange: (elements: OpticalElement[]) => void;
  hitTargets: Set<string>;
  selectedMirrorId: string | null;
  onSelectMirror: (id: string | null) => void;
}

const CanvasWidth = 400;
const CanvasHeight = 350;

const GameCanvas: React.FC<GameCanvasProps> = ({
  elements,
  onElementsChange,
  hitTargets,
  selectedMirrorId,
  onSelectMirror,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rays, setRays] = useState<LightRay[]>([]);

  useEffect(() => {
    const { rays: newRays } = calculateLightPath(
      elements,
      CanvasWidth,
      CanvasHeight
    );
    setRays(newRays);
  }, [elements]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    draw(ctx);
  }, [elements, rays, hitTargets, selectedMirrorId]);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, CanvasWidth, CanvasHeight);

    ctx.strokeStyle = 'rgba(100, 100, 150, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < CanvasWidth; i += 25) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CanvasHeight);
      ctx.stroke();
    }
    for (let i = 0; i < CanvasHeight; i += 25) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CanvasWidth, i);
      ctx.stroke();
    }

    for (const ray of rays) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = colorMap[ray.color];
      ctx.shadowColor = colorMap[ray.color];
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(ray.startX, ray.startY);
      ctx.lineTo(ray.endX, ray.endY);
      ctx.stroke();
      
      ctx.lineWidth = 2;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(ray.startX, ray.startY);
      ctx.lineTo(ray.endX, ray.endY);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;

    for (const element of elements) {
      drawElement(ctx, element, hitTargets.has(element.id), element.id === selectedMirrorId);
    }
  };

  const drawElement = (
    ctx: CanvasRenderingContext2D,
    element: OpticalElement,
    isHit: boolean,
    isSelected: boolean
  ) => {
    ctx.save();
    ctx.translate(element.x, element.y);
    ctx.rotate((element.angle * Math.PI) / 180);

    switch (element.type) {
      case 'lightSource':
        const lightColor = element.color || 'yellow';
        ctx.fillStyle = colorMap[lightColor];
        ctx.shadowColor = colorMap[lightColor];
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(0, 0, element.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = '#000';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('☼', 0, 4);
        break;

      case 'mirror':
        ctx.fillStyle = '#c0c0c0';
        ctx.strokeStyle = isSelected ? '#ffdd44' : '#ffffff';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.shadowColor = isSelected ? '#ffdd44' : '#ffffff';
        ctx.shadowBlur = isSelected ? 10 : 5;
        ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);
        ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height);
        ctx.shadowBlur = 0;
        break;

      case 'twoWayMirror':
        ctx.fillStyle = 'rgba(200, 200, 255, 0.5)';
        ctx.strokeStyle = isSelected ? '#ffdd44' : '#8888ff';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.shadowColor = isSelected ? '#ffdd44' : '#8888ff';
        ctx.shadowBlur = isSelected ? 10 : 5;
        ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);
        ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height);
        
        ctx.fillStyle = '#8888ff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('↔', 0, 4);
        ctx.shadowBlur = 0;
        break;

      case 'splitter':
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.strokeStyle = '#aaaaff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#aaaaff';
        ctx.shadowBlur = 5;
        ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);

        ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height);
        
        ctx.fillStyle = '#aaaaff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('◇', 0, 4);
        ctx.shadowBlur = 0;
        break;

      case 'beamSplitter':
        ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.strokeStyle = '#44aaff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#44aaff';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(-element.width / 2, -element.height / 2);
        ctx.lineTo(element.width / 2, element.height / 2);
        ctx.moveTo(element.width / 2, -element.height / 2);
        ctx.lineTo(-element.width / 2, element.height / 2);
        ctx.stroke();
        
        ctx.fillStyle = '#44aaff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✕', 0, 4);
        ctx.shadowBlur = 0;
        break;

      case 'colorFilter':
        const filterColor = element.filterColor || 'white';
        ctx.fillStyle = colorMap[filterColor];
        ctx.globalAlpha = 0.4;
        ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colorMap[filterColor];
        ctx.lineWidth = 2;
        ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height);
        break;

      case 'target':
        const targetColor = element.color || 'blue';
        ctx.strokeStyle = isHit ? '#00ff00' : colorMap[targetColor];
        ctx.fillStyle = isHit ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = isHit ? 3 : 2;
        ctx.shadowColor = isHit ? '#00ff00' : 'transparent';
        ctx.shadowBlur = isHit ? 15 : 0;
        
        ctx.beginPath();
        ctx.moveTo(0, -element.height / 2);
        ctx.lineTo(element.width / 2, 0);
        ctx.lineTo(0, element.height / 2);
        ctx.lineTo(-element.width / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        break;

      case 'obstacle':
        ctx.fillStyle = '#333344';
        ctx.strokeStyle = '#555566';
        ctx.lineWidth = 2;
        ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);
        ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height);
        break;

      case 'lens':
        const lensColor = isSelected ? '#ffdd44' : '#ffaa44';
        ctx.fillStyle = 'rgba(255, 170, 68, 0.3)';
        ctx.strokeStyle = lensColor;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.shadowColor = lensColor;
        ctx.shadowBlur = isSelected ? 10 : 5;
        
        ctx.beginPath();
        ctx.ellipse(0, 0, element.width / 2, element.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.ellipse(0, 0, element.width / 3, element.height / 3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        break;

      case 'lightDetector':
        ctx.fillStyle = isHit ? '#00ff88' : '#335544';
        ctx.strokeStyle = isHit ? '#00ff88' : '#557766';
        ctx.lineWidth = 2;
        ctx.shadowColor = isHit ? '#00ff88' : 'transparent';
        ctx.shadowBlur = isHit ? 10 : 0;
        
        ctx.beginPath();
        ctx.roundRect(-element.width / 2, -element.height / 2, element.width, element.height, 5);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = isHit ? '#ffffff' : '#66aa88';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('●', 0, 5);
        ctx.shadowBlur = 0;
        break;

      case 'prism':
        ctx.fillStyle = 'rgba(150, 200, 255, 0.4)';
        ctx.strokeStyle = '#88ccff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#88ccff';
        ctx.shadowBlur = 5;
        
        ctx.beginPath();
        ctx.moveTo(0, -element.height / 2);
        ctx.lineTo(element.width / 2, element.height / 2);
        ctx.lineTo(-element.width / 2, element.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#88ccff';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('△', 0, 2);
        ctx.shadowBlur = 0;
        break;
    }

    ctx.restore();
    ctx.restore();
  };

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const getElementAtPos = (x: number, y: number) => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      const dx = x - element.x;
      const dy = y - element.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const hitRadius = Math.max(element.width, element.height) / 2 + 15;
      if (dist < hitRadius) return element;
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePos(e);
    const element = getElementAtPos(pos.x, pos.y);
    
    if (element && element.draggable) {
      setDraggingId(element.id);
      setDragOffset({
        x: pos.x - element.x,
        y: pos.y - element.y,
      });
      onSelectMirror(element.id);
    } else {
      onSelectMirror(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId) return;
    const pos = getMousePos(e);
    updateElementPosition(pos.x, pos.y);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const pos = getMousePos(e);
    const element = getElementAtPos(pos.x, pos.y);
    
    if (element && element.draggable) {
      setDraggingId(element.id);
      setDragOffset({
        x: pos.x - element.x,
        y: pos.y - element.y,
      });
      onSelectMirror(element.id);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!draggingId) return;
    const pos = getMousePos(e);
    updateElementPosition(pos.x, pos.y);
  };

  const handleTouchEnd = () => {
    setDraggingId(null);
  };

  const updateElementPosition = (x: number, y: number) => {
    const newElements = elements.map(el => {
      if (el.id === draggingId) {
        return {
          ...el,
          x: Math.max(30, Math.min(CanvasWidth - 30, x - dragOffset.x)),
          y: Math.max(30, Math.min(CanvasHeight - 30, y - dragOffset.y)),
        };
      }
      return el;
    });
    onElementsChange(newElements);
  };

  return (
    <canvas
      ref={canvasRef}
      width={CanvasWidth}
      height={CanvasHeight}
      className="rounded-xl shadow-2xl cursor-grab active:cursor-grabbing touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default GameCanvas;
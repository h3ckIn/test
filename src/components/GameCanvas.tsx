
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
        ctx.fillStyle = isHit ? '#00ff00' : colorMap[targetColor];
        ctx.shadowColor = isHit ? '#00ff00' : colorMap[targetColor];
        ctx.shadowBlur = isHit ? 20 : 10;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, element.width / 2, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 0, element.width / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        break;
    }

    ctx.restore();
  };

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
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
    if (element) {
      if (element.draggable) {
        setDraggingId(element.id);
        setDragOffset({ x: pos.x - element.x, y: pos.y - element.y });
      }
      if (element.type === 'mirror' || element.type === 'splitter' || element.type === 'colorFilter') {
        onSelectMirror(element.id);
      }
    } else {
      onSelectMirror(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const pos = getMousePos(e);
    const element = getElementAtPos(pos.x, pos.y);
    if (element) {
      if (element.draggable) {
        setDraggingId(element.id);
        setDragOffset({ x: pos.x - element.x, y: pos.y - element.y });
      }
      if (element.type === 'mirror' || element.type === 'splitter' || element.type === 'colorFilter') {
        onSelectMirror(element.id);
      }
    } else {
      onSelectMirror(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId) return;
    const pos = getMousePos(e);
    updateElementPosition(pos.x, pos.y);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!draggingId) return;
    const pos = getMousePos(e);
    updateElementPosition(pos.x, pos.y);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
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
      className="border-2 border-gray-700 rounded-lg cursor-grab active:cursor-grabbing touch-none"
      style={{ maxWidth: '100%', height: 'auto' }}
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

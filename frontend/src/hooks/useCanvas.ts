import { useState, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tool, DrawObject } from '../types';

export const useCanvas = (
  tool: Tool,
  strokeColor: string,
  strokeWidth: number,
  fillColor: string,
  onDraw: (object: DrawObject) => void
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentObject, setCurrentObject] = useState<DrawObject | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const startDrawing = useCallback((x: number, y: number) => {
    setIsDrawing(true);
    startPos.current = { x, y };

    if (tool === 'pen') {
      const newObject: DrawObject = {
        id: uuidv4(),
        type: 'pen',
        x: 0,
        y: 0,
        points: [x, y],
        stroke: strokeColor,
        strokeWidth,
      };
      setCurrentObject(newObject);
    }
  }, [tool, strokeColor, strokeWidth]);

  const continueDrawing = useCallback((x: number, y: number) => {
    if (!isDrawing || !startPos.current) return;

    if (tool === 'pen' && currentObject) {
      setCurrentObject({
        ...currentObject,
        points: [...(currentObject.points || []), x, y]
      });
    } else if (tool !== 'select' && tool !== 'eraser' && tool !== 'pen') {
      const obj = createShapeObject(tool, startPos.current, { x, y }, strokeColor, strokeWidth, fillColor);
      setCurrentObject(obj);
    }
  }, [isDrawing, tool, currentObject, strokeColor, strokeWidth, fillColor]);

  const finishDrawing = useCallback(() => {
    if (currentObject) {
      onDraw(currentObject);
    }
    setIsDrawing(false);
    setCurrentObject(null);
    startPos.current = null;
  }, [currentObject, onDraw]);

  return {
    isDrawing,
    currentObject,
    startDrawing,
    continueDrawing,
    finishDrawing
  };
};

function createShapeObject(
  tool: Tool,
  start: { x: number; y: number },
  end: { x: number; y: number },
  stroke: string,
  strokeWidth: number,
  fill: string
): DrawObject {
  const id = uuidv4();
  
  switch (tool) {
    case 'line':
      return {
        id,
        type: 'line',
        x: start.x,
        y: start.y,
        points: [0, 0, end.x - start.x, end.y - start.y],
        stroke,
        strokeWidth,
      };
    case 'arrow':
      return {
        id,
        type: 'arrow',
        x: start.x,
        y: start.y,
        points: [0, 0, end.x - start.x, end.y - start.y],
        stroke,
        strokeWidth,
      };
    case 'rect':
      return {
        id,
        type: 'rect',
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(end.y - start.y),
        stroke,
        strokeWidth,
        fill: fill === 'transparent' ? undefined : fill,
      };
    case 'circle':
      const radius = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );
      return {
        id,
        type: 'circle',
        x: start.x,
        y: start.y,
        radius,
        stroke,
        strokeWidth,
        fill: fill === 'transparent' ? undefined : fill,
      };
    default:
      return {
        id,
        type: 'pen',
        x: 0,
        y: 0,
        points: [start.x, start.y, end.x, end.y],
        stroke,
        strokeWidth,
      };
  }
}

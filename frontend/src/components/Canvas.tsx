import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Arrow, Text as KonvaText } from 'react-konva';
import { Tool, DrawObject, User } from '../types';
import { useCanvas } from '../hooks/useCanvas';

interface CanvasProps {
  tool: Tool;
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
  users: User[];
  objects: DrawObject[];
  onDraw: (object: DrawObject) => void;
  onUpdateObject: (object: Partial<DrawObject> & { id: string }) => void;
  onDeleteObject: (objectId: string) => void;
  onCursorMove: (position: { x: number; y: number }) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  tool,
  strokeColor,
  strokeWidth,
  fillColor,
  users,
  objects,
  onDraw,
  onUpdateObject,
  onCursorMove,
}) => {
  const stageRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  const [localObjects, setLocalObjects] = useState<DrawObject[]>([]);

  // Combine server objects with local objects
  const allObjects = [...objects, ...localObjects];

  const { isDrawing, currentObject, startDrawing, continueDrawing, finishDrawing } = useCanvas(
    tool,
    strokeColor,
    strokeWidth,
    fillColor,
    (drawnObject) => {
      // Add to local state immediately
      setLocalObjects(prev => [...prev, drawnObject]);
      // Emit to server
      onDraw(drawnObject);
      // Clear local after a delay (server will send it back)
      setTimeout(() => {
        setLocalObjects(prev => prev.filter(obj => obj.id !== drawnObject.id));
      }, 100);
    }
  );

  // Generate remote cursors from users
  const remoteCursors = users
    .filter(user => user.cursor && (user.cursor.x !== 0 || user.cursor.y !== 0))
    .map(user => ({
      userId: user.id,
      username: user.username,
      position: user.cursor,
      color: user.color
    }));

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight - 56
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: any) => {
    if (tool === 'select') return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (point) {
      startDrawing(point.x, point.y);
    }
  };

  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    if (point) {
      onCursorMove(point);

      if (isDrawing) {
        continueDrawing(point.x, point.y);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      finishDrawing();
    }
  };

  const renderObject = (obj: DrawObject) => {
    const commonProps = {
      key: obj.id,
      draggable: tool === 'select',
      onDragEnd: (e: any) => {
        onUpdateObject({
          id: obj.id,
          x: e.target.x(),
          y: e.target.y(),
        });
      },
    };

    switch (obj.type) {
      case 'pen':
        return (
          <Line
            {...commonProps}
            points={obj.points || []}
            stroke={obj.stroke}
            strokeWidth={obj.strokeWidth}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        );
      case 'line':
        return (
          <Line
            {...commonProps}
            x={obj.x}
            y={obj.y}
            points={obj.points || []}
            stroke={obj.stroke}
            strokeWidth={obj.strokeWidth}
            lineCap="round"
          />
        );
      case 'arrow':
        return (
          <Arrow
            {...commonProps}
            x={obj.x}
            y={obj.y}
            points={obj.points || []}
            stroke={obj.stroke}
            strokeWidth={obj.strokeWidth}
            fill={obj.stroke}
            pointerLength={10}
            pointerWidth={10}
          />
        );
      case 'rect':
        return (
          <Rect
            {...commonProps}
            x={obj.x}
            y={obj.y}
            width={obj.width || 0}
            height={obj.height || 0}
            stroke={obj.stroke}
            strokeWidth={obj.strokeWidth}
            fill={obj.fill}
          />
        );
      case 'circle':
        return (
          <Circle
            {...commonProps}
            x={obj.x}
            y={obj.y}
            radius={obj.radius || 0}
            stroke={obj.stroke}
            strokeWidth={obj.strokeWidth}
            fill={obj.fill}
          />
        );
      case 'text':
        return (
          <KonvaText
            {...commonProps}
            x={obj.x}
            y={obj.y}
            text={obj.text || ''}
            fontSize={obj.fontSize || 24}
            fill={obj.stroke}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="canvas-container">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="canvas-stage"
      >
        <Layer>
          {/* Grid */}
          {Array.from({ length: Math.ceil(stageSize.width / 50) }).map((_, i) => (
            <Line
              key={`v-${i}`}
              points={[i * 50, 0, i * 50, stageSize.height]}
              stroke="#252525"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: Math.ceil(stageSize.height / 50) }).map((_, i) => (
            <Line
              key={`h-${i}`}
              points={[0, i * 50, stageSize.width, i * 50]}
              stroke="#252525"
              strokeWidth={1}
            />
          ))}

          {/* All Objects (server + local) */}
          {allObjects.map(renderObject)}
          
          {/* Current drawing object */}
          {currentObject && renderObject(currentObject)}

          {/* Remote Cursors */}
          {remoteCursors.map(cursor => (
            <React.Fragment key={cursor.userId}>
              <Circle
                x={cursor.position.x}
                y={cursor.position.y}
                radius={8}
                fill={cursor.color}
                opacity={0.7}
              />
              <KonvaText
                x={cursor.position.x + 12}
                y={cursor.position.y - 20}
                text={cursor.username}
                fontSize={12}
                fill="#ffffff"
                padding={4}
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;

export interface DrawObject {
    id: string;
    type: 'pen' | 'line' | 'rect' | 'circle' | 'text' | 'arrow';
    x: number;
    y: number;
    points?: number[];
    width?: number;
    height?: number;
    radius?: number;
    text?: string;
    stroke: string;
    strokeWidth: number;
    fill?: string;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    fontSize?: number;
  }
  
  export interface User {
    id: string;
    username: string;
    color: string;
    cursor: CursorPosition;
  }
  
  export interface CursorPosition {
    x: number;
    y: number;
  }
  
  export interface CanvasState {
    objects: DrawObject[];
    version: number;
  }
  
  export type Tool = 'select' | 'pen' | 'line' | 'rect' | 'circle' | 'text' | 'arrow' | 'eraser';
  
  export interface RemoteCursor {
    userId: string;
    username: string;
    position: CursorPosition;
    color: string;
  }
  
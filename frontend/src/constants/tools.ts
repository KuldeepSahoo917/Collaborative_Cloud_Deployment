import { Tool } from '../types';

export const TOOLS: { id: Tool; label: string; icon: string }[] = [
  { id: 'select', label: 'Select', icon: '⊙' },
  { id: 'pen', label: 'Pen', icon: '✏️' },
  { id: 'line', label: 'Line', icon: '─' },
  { id: 'arrow', label: 'Arrow', icon: '→' },
  { id: 'rect', label: 'Rectangle', icon: '▭' },
  { id: 'circle', label: 'Circle', icon: '○' },
  { id: 'text', label: 'Text', icon: 'T' },
  { id: 'eraser', label: 'Eraser', icon: '🗑' },
];

import React from 'react';
import { Tool } from '../types';
import { TOOLS } from '../constants/tools';
import { COLOR_PALETTE } from '../constants/colors';

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onToolChange,
  strokeColor,
  onStrokeColorChange,
  strokeWidth,
  onStrokeWidthChange,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <div className="toolbar-label">Tools</div>
        <div className="toolbar-tools">
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => onToolChange(tool.id)}
              title={tool.label}
            >
              <span className="tool-icon">{tool.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-section">
        <div className="toolbar-label">Stroke</div>
        <div className="color-picker-grid">
          {COLOR_PALETTE.map(color => (
            <button
              key={color}
              className={`color-button ${strokeColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onStrokeColorChange(color)}
              title={color}
            >
              {strokeColor === color && (
                <div className="color-check">✓</div>
              )}
            </button>
          ))}
        </div>

        <div className="stroke-width-section">
          <div className="toolbar-sublabel">Width: {strokeWidth}px</div>
          <input
            type="range"
            min="1"
            max="16"
            value={strokeWidth}
            onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
            className="stroke-slider"
          />
          <div className="stroke-preview">
            <div 
              className="stroke-preview-line"
              style={{ 
                height: `${strokeWidth}px`, 
                backgroundColor: strokeColor 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;

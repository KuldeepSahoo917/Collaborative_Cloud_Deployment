import React from 'react';
import { COLOR_PALETTE } from '../constants/colors';

interface PropertiesPanelProps {
  fillColor: string;
  onFillColorChange: (color: string) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  fillColor,
  onFillColorChange,
}) => {
  return (
    <div className="properties-panel">
      <div className="properties-section">
        <div className="properties-label">Fill</div>
        <div className="color-picker-grid">
          <button
            className={`color-button ${fillColor === 'transparent' ? 'active' : ''}`}
            onClick={() => onFillColorChange('transparent')}
            title="No fill"
            style={{ 
              backgroundColor: '#2d2d2d',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: '#ef4444',
              transform: 'rotate(45deg)',
              top: '50%',
              left: 0
            }}></div>
            {fillColor === 'transparent' && (
              <div className="color-check">✓</div>
            )}
          </button>
          {COLOR_PALETTE.map(color => (
            <button
              key={color}
              className={`color-button ${fillColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onFillColorChange(color)}
              title={color}
            >
              {fillColor === color && (
                <div className="color-check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="properties-divider"></div>

      <div className="properties-section">
        <div className="properties-label">Shortcuts</div>
        <div className="shortcuts-list">
          <div className="shortcut-item">
            <kbd>V</kbd>
            <span>Select</span>
          </div>
          <div className="shortcut-item">
            <kbd>P</kbd>
            <span>Pen</span>
          </div>
          <div className="shortcut-item">
            <kbd>L</kbd>
            <span>Line</span>
          </div>
          <div className="shortcut-item">
            <kbd>R</kbd>
            <span>Rectangle</span>
          </div>
          <div className="shortcut-item">
            <kbd>C</kbd>
            <span>Circle</span>
          </div>
          <div className="shortcut-item">
            <kbd>T</kbd>
            <span>Text</span>
          </div>
          <div className="shortcut-item">
            <kbd>Ctrl+Z</kbd>
            <span>Undo</span>
          </div>
          <div className="shortcut-item">
            <kbd>Del</kbd>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;

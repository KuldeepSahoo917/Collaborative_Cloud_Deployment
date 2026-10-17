import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import { useWebSocket } from './hooks/useWebSocket';
import { Tool } from './types';
import './App.css';

function App() {
  const [roomId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('room') || uuidv4().slice(0, 8);
  });

  const [username] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('user') || `User${Math.floor(Math.random() * 1000)}`;
  });

  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [strokeColor, setStrokeColor] = useState('#0078d4');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [fillColor, setFillColor] = useState('transparent');

  const {
    users,
    connected,
    canvasObjects,
    emitDraw,
    emitUpdateObject,
    emitDeleteObject,
    emitCursorMove,
    emitClearCanvas,
    emitUndo
  } = useWebSocket(roomId, username);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('room', roomId);
    url.searchParams.set('user', username);
    window.history.replaceState({}, '', url.toString());
  }, [roomId, username]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          emitUndo();
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'v':
          setActiveTool('select');
          break;
        case 'p':
          setActiveTool('pen');
          break;
        case 'l':
          setActiveTool('line');
          break;
        case 'r':
          setActiveTool('rect');
          break;
        case 'c':
          setActiveTool('circle');
          break;
        case 't':
          setActiveTool('text');
          break;
        case 'a':
          setActiveTool('arrow');
          break;
        case 'e':
          setActiveTool('eraser');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emitUndo]);

  return (
    <div className="app">
      <Navbar
        roomId={roomId}
        users={users}
        connected={connected}
        onClearCanvas={emitClearCanvas}
      />

      <div className="workspace">
        <Toolbar
          activeTool={activeTool}
          onToolChange={setActiveTool}
          strokeColor={strokeColor}
          onStrokeColorChange={setStrokeColor}
          strokeWidth={strokeWidth}
          onStrokeWidthChange={setStrokeWidth}
        />

        <Canvas
          tool={activeTool}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          fillColor={fillColor}
          users={users}
          objects={canvasObjects}
          onDraw={emitDraw}
          onUpdateObject={emitUpdateObject}
          onDeleteObject={emitDeleteObject}
          onCursorMove={emitCursorMove}
        />

        <PropertiesPanel
          fillColor={fillColor}
          onFillColorChange={setFillColor}
        />
      </div>
    </div>
  );
}

export default App;

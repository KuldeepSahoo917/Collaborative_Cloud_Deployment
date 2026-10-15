import React, { useState } from 'react';
import { User } from '../types';

interface NavbarProps {
  roomId: string;
  users: User[];
  connected: boolean;
  onClearCanvas: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ roomId, users, connected, onClearCanvas }) => {
  const [copied, setCopied] = useState(false);

  const copyRoomId = () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas? This action cannot be undone.')) {
      onClearCanvas();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <div className="logo-icon">◧</div>
          <span className="logo-text">Whiteboard</span>
        </div>
        
        <div className="navbar-room">
          <span className="room-label">Room:</span>
          <code className="room-id">{roomId}</code>
          <button 
            className="copy-button" 
            onClick={copyRoomId}
            title="Copy room link"
          >
            {copied ? '✓' : '⎘'}
          </button>
        </div>
      </div>

      <div className="navbar-center">
        <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
          <div className="status-dot"></div>
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="users-section">
          <span className="users-count">{users.length} online</span>
          <div className="users-avatars">
            {users.slice(0, 5).map(user => (
              <div 
                key={user.id} 
                className="user-avatar"
                style={{ backgroundColor: user.color }}
                title={user.username}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
            ))}
            {users.length > 5 && (
              <div className="user-avatar more-users">
                +{users.length - 5}
              </div>
            )}
          </div>
        </div>

        <button className="navbar-button" onClick={handleClearCanvas} title="Clear canvas">
          Clear
        </button>

        <button className="navbar-button export-button" title="Export canvas">
          Export
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

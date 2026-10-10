import React from 'react';
import './StatusBar.css';

interface StatusBarProps {
  time?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ time = '9:41' }) => {
  return (
    <header className="ios-status-bar" aria-label="Barra de status">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        {/* Cellular Signal (4 bars) */}
        <svg className="status-icon" width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="8" width="3" height="3" rx="1" />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="1" />
          <rect x="9" y="3" width="3" height="8" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>

        {/* Wifi Icon */}
        <svg className="status-icon" width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <path d="M8 2.5C10.6 2.5 13 3.6 14.7 5.4L16 4C13.9 1.8 11.1 0.5 8 0.5C4.9 0.5 2.1 1.8 0 4L1.3 5.4C3 3.6 5.4 2.5 8 2.5ZM8 6.5C9.6 6.5 11 7.2 12 8.3L13.3 6.9C11.9 5.4 9.9 4.5 8 4.5C6.1 4.5 4.1 5.4 2.7 6.9L4 8.3C5 7.2 6.4 6.5 8 6.5ZM8 9.5C8.8 9.5 9.5 10.2 9.5 11H6.5C6.5 10.2 7.2 9.5 8 9.5Z" />
        </svg>

        {/* Battery Icon */}
        <svg className="status-icon" width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeWidth="1" />
          <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" />
          <path d="M23 4C23.6 4.3 24 5.1 24 6C24 6.9 23.6 7.7 23 8V4Z" fill="currentColor" />
        </svg>
      </div>
    </header>
  );
};

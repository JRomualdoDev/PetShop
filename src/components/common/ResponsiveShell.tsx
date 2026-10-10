import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Eye } from 'lucide-react';
import './ResponsiveShell.css';

interface ResponsiveShellProps {
  children: React.ReactNode;
  figmaRefImage?: string;
}

type ViewMode = 'mobile' | 'tablet' | 'fluid';

export const ResponsiveShell: React.FC<ResponsiveShellProps> = ({
  children,
  figmaRefImage = '/design/home.png',
}) => {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const urlMode = searchParams.get('mode') as ViewMode | null;
  const urlCompare = searchParams.get('compare') === 'true';

  const [viewMode, setViewMode] = useState<ViewMode>(urlMode || 'mobile');
  const [showFigmaOverlay, setShowFigmaOverlay] = useState(urlCompare);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);

  return (
    <div className={`responsive-viewport-container mode-${viewMode}`}>
      {/* Top Desktop Helper Toolbar */}
      <aside className="preview-toolbar" aria-label="Controles de visualização responsiva">
        <div className="preview-toolbar-badge">
          <span className="live-dot" /> PetConnect UI • Figma Preview
        </div>

        <div className="preview-mode-switchers">
          <button
            type="button"
            className={`mode-btn ${viewMode === 'mobile' ? 'active' : ''}`}
            onClick={() => setViewMode('mobile')}
            title="Visualização iPhone / Figma 1:1 (402px)"
          >
            <Smartphone size={16} />
            <span>Mobile (402px)</span>
          </button>

          <button
            type="button"
            className={`mode-btn ${viewMode === 'tablet' ? 'active' : ''}`}
            onClick={() => setViewMode('tablet')}
            title="Visualização Tablet (640px)"
          >
            <Tablet size={16} />
            <span>Tablet</span>
          </button>

          <button
            type="button"
            className={`mode-btn ${viewMode === 'fluid' ? 'active' : ''}`}
            onClick={() => setViewMode('fluid')}
            title="Visualização Fluida / Desktop"
          >
            <Monitor size={16} />
            <span>Fluido</span>
          </button>
        </div>

        <div className="preview-figma-compare">
          <button
            type="button"
            className={`compare-toggle-btn ${showFigmaOverlay ? 'active' : ''}`}
            onClick={() => setShowFigmaOverlay(!showFigmaOverlay)}
            title="Comparar com referência original do Figma"
          >
            <Eye size={16} />
            <span>{showFigmaOverlay ? 'Ocultar Figma' : 'Comparar Figma'}</span>
          </button>

          {showFigmaOverlay && (
            <div className="opacity-slider-box">
              <span className="slider-label">{Math.round(overlayOpacity * 100)}%</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                className="opacity-slider"
              />
            </div>
          )}
        </div>
      </aside>

      {/* Main Device Stage */}
      <main className="device-stage">
        <div className={`app-device-frame mode-${viewMode}`}>
          {/* Optional Figma Reference Comparison Overlay */}
          {showFigmaOverlay && (
            <div
              className="figma-overlay"
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            >
              <img
                src={figmaRefImage}
                alt="Referência Figma"
                className="figma-overlay-img"
              />
            </div>
          )}

          {/* Render the actual React application inside the frame */}
          <div className="app-screen-scroll-container">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

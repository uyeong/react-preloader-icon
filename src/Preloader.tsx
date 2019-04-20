import React, { CSSProperties } from 'react';

export interface LoaderProps {
  strokeWidth: number;
  strokeColor: string;
  duration: number;
}

interface Props {
  className?: string;
  style?: CSSProperties;
  use: React.FC<LoaderProps>;
  size?: number | string;
  strokeWidth?: number;
  strokeColor?: string;
  duration?: number;
}

const Preloader: React.FC<Props> = ({
  className = '',
  style = {},
  use,
  size = '100%',
  strokeWidth = 3,
  strokeColor = '#f0ad4e',
  duration = 800,
}) => {
  const length = !Number.isNaN(Number(size)) ? size + 'px' : size;
  return (
    <div className={`preloader-icon ${className}`} style={{ width: length, height: length, ...style }}>
      <div
        className="preloader-icon__inner"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backfaceVisibility: 'hidden',
          lineHeight: 0,
        }}
      >
        <em
          className="preloader-icon__title"
          style={{
            position: 'absolute',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: '0',
          }}
        >
          Loading...
        </em>
        {React.createElement(use, { strokeWidth, strokeColor, duration })}
      </div>
    </div>
  );
};

export default Preloader;

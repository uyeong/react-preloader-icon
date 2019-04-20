import React, { useRef } from 'react';
import useBlinking from '../hooks/useBlinking';
import useRadius from '../hooks/useRadius';
import { LoaderProps } from '../Preloader';

const Spinning: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const gRef = useRef();
  const radius = useRadius(strokeWidth);
  useBlinking(gRef, duration);
  return (
    <div className="preloader-icon__spinning" style={{ height: '100%' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 540 540">
        <g
          // @ts-ignore
          ref={gRef}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        >
          <circle cx="490" cy="270" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
          <circle cx="425.56" cy="425.56" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
          <circle cx="270" cy="490" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
          <circle cx="114.43" cy="425.56" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
          <circle cx="50" cy="270" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
          <circle cx="114.43" cy="114.43" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
          <circle cx="269.99" cy="50" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
          <circle cx="425.56" cy="114.43" r={radius} style={{ fillOpacity: 0 }} fill={strokeColor} />
        </g>
      </svg>
    </div>
  );
};

export default Spinning;

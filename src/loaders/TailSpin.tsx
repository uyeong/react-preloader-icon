import React, { useRef } from 'react';
import useRadius from '../hooks/useRadius';
import useRotate from '../hooks/useRotate';
import { LoaderProps } from '../Preloader';

const TailSpin: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const pathRef = useRef();
  const radius = useRadius(strokeWidth);
  useRotate(pathRef, duration);
  return (
    <div className="preloader-icon__tail-spin">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">
        <defs>
          <linearGradient id="tail" x1="8.042%" y1="0%" x2="65.682%" y2="23.865%">
            <stop stopColor={strokeColor} stopOpacity="0" offset="0%" />
            <stop stopColor={strokeColor} stopOpacity=".631" offset="63.146%" />
            <stop stopColor={strokeColor} offset="100%" />
          </linearGradient>
        </defs>
        <path
          // @ts-ignore
          ref={pathRef}
          d={`M0,-${radius} a${radius},${radius} 0 0,1 ${radius},${radius}`}
          stroke="url(#tail)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default TailSpin;

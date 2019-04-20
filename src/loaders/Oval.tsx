import React, { useRef } from 'react';
import useRadius from '../hooks/useRadius';
import useRotate from '../hooks/useRotate';
import { LoaderProps } from '../Preloader';

const Oval: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const pathRef = useRef();
  const radius = useRadius(strokeWidth);
  useRotate(pathRef, duration);
  return (
    <div className="preloader-icon__oval" style={{ height: '100%' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-50 -50 100 100">
        <g fill="none" strokeWidth={strokeWidth} stroke={strokeColor}>
          <circle strokeOpacity=".5" r={radius} />
          <path
            // @ts-ignore
            ref={pathRef}
            d={`M0,-${radius} a${radius},${radius} 0 0,1 ${radius},${radius}`}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
          />
        </g>
      </svg>
    </div>
  );
};

export default Oval;

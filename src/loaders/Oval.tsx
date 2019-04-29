import React, { useEffect, useMemo, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

function useRotate(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    const element = ref.current as SVGElement;
    return loop({
      duration,
      update(n: number) {
        element.setAttribute('transform', `rotate(${n * 360})`);
      },
    });
  }, [duration]);
  return ref;
}

const Oval: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const radius = useMemo(() => 50 - strokeWidth / 2, [strokeWidth]);
  const pathRef = useRotate(duration);
  return (
    <div className="preloader-icon__oval">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">
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

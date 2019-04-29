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

const TailSpin: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const radius = useMemo(() => 50 - strokeWidth / 2, [strokeWidth]);
  const pathRef = useRotate(duration);
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
          ref={pathRef as any}
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

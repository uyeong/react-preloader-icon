import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { LoaderProps } from '../PreloaderIcon';

function useRotate(ref: MutableRefObject<SVGElement | undefined>, duration: number) {
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const pathElement = ref.current as SVGElement;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        const progress = pastTime / duration;
        const deg = progress <= 1 ? progress * 360 : 360;
        pathElement.setAttribute('transform', `rotate(${deg})`);
        if (pastTime >= duration) {
          startTime = timestamp;
        }
        reqId = window.requestAnimationFrame(step);
      };
      reqId = window.requestAnimationFrame(step);
    }
    return () => window.cancelAnimationFrame(reqId);
  }, [duration]);
}

const Oval: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const pathRef = useRef<SVGPathElement>();
  const radius = useMemo(() => 50 - strokeWidth / 2, [strokeWidth]);
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

import React, { MutableRefObject, useEffect, useRef } from 'react';
import useRadius from '../hooks/useRadius';
import { LoaderProps } from '../Preloader';

function useBlinking(ref: MutableRefObject<SVGElement | undefined>, duration: number) {
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const elements: SVGElement[] = [].slice.call((ref.current as SVGElement).children);
      const count = elements.length;
      const partProgress = 1 / count;
      let prevIndex = 0;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        let progress = pastTime / duration;
        progress = progress >= 1 ? 0.9999 : progress;
        const nextIndex = Math.floor(progress / partProgress);
        let nextTarget;
        let prevTarget;
        if (nextIndex - 1 !== prevIndex && !(nextIndex === 0 && prevIndex === count - 1)) {
          prevTarget = elements[prevIndex];
          prevTarget.style.fillOpacity = '0';
          prevIndex = nextIndex === 0 ? count - 1 : nextIndex - 1;
        }
        progress = (progress - partProgress * nextIndex) / partProgress;
        nextTarget = elements[nextIndex];
        prevTarget = elements[prevIndex];
        nextTarget.style.fillOpacity = String(progress);
        prevTarget.style.fillOpacity = String(1 - progress);
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

import bezierEasing from 'bezier-easing';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import useRadius from '../hooks/useRadius';
import { LoaderProps } from '../Preloader';

const spread = bezierEasing(0.165, 0.84, 0.44, 1);
const fade = bezierEasing(0.3, 0.61, 0.355, 1);

function useWave(ref: MutableRefObject<SVGElement | undefined>, radius: number, duration: number) {
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const [c1, c2] = [].slice.call((ref.current as SVGElement).children) as SVGElement[];
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        const n = pastTime / duration;
        const n2 = n >= 0.5 ? n - 0.5 : n + 0.5;
        c1.setAttribute('r', String(spread(n) * radius));
        c2.setAttribute('r', String(spread(n2) * radius));
        c1.style.strokeOpacity = String(1 - fade(n));
        c2.style.strokeOpacity = String(1 - fade(n2));
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

const Puff: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const gRef = useRef<SVGElement>();
  const radius = useRadius(strokeWidth);
  useWave(gRef, radius, duration);
  return (
    <div className="preloader-icon__puff">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">
        <g
          // @ts-ignore
          ref={gRef}
          strokeWidth={strokeWidth}
          stroke={strokeColor}
          fill="none"
        >
          <circle r="0" style={{ strokeOpacity: 1 }} />
          <circle r="0" style={{ strokeOpacity: 1 }} />
        </g>
      </svg>
    </div>
  );
};

export default Puff;

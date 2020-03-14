import bezierEasing from 'bezier-easing';
import React, { useEffect, useMemo, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

const spread = bezierEasing(0.165, 0.84, 0.44, 1);
const fade = bezierEasing(0.3, 0.61, 0.355, 1);

function useWave(radius: number, duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    const circles = ref.current!.querySelectorAll('circle');
    return loop({
      duration,
      update(n: number) {
        const n2 = n >= 0.5 ? n - 0.5 : n + 0.5;
        circles[0].setAttribute('r', String(spread(n) * radius));
        circles[0].style.strokeOpacity = String(1 - fade(n));
        circles[1].setAttribute('r', String(spread(n2) * radius));
        circles[1].style.strokeOpacity = String(1 - fade(n2));
      },
    });
  }, [radius, duration]);
  return ref;
}

const Puff: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const radius = useMemo(() => 50 - strokeWidth / 2, [strokeWidth]);
  const gRef = useWave(radius, duration);
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

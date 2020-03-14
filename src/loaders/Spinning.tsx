import React, { useEffect, useMemo, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

function useBlinking(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    const elements = ref.current!.querySelectorAll('circle');
    const count = elements.length;
    const partProgress = 1 / count;
    let prevIndex = 0;
    return loop({
      duration,
      update(n: number) {
        const nextIndex = Math.floor(n / partProgress);
        let nextTarget;
        let prevTarget;
        if (nextIndex - 1 !== prevIndex && !(nextIndex === 0 && prevIndex === count - 1)) {
          prevTarget = elements[prevIndex] as SVGCircleElement;
          prevTarget.style.fillOpacity = '0';
          prevIndex = nextIndex === 0 ? count - 1 : nextIndex - 1;
        }
        const progress = (n - partProgress * nextIndex) / partProgress;
        nextTarget = elements[nextIndex] as SVGCircleElement;
        prevTarget = elements[prevIndex] as SVGCircleElement;
        nextTarget.style.fillOpacity = String(progress);
        prevTarget.style.fillOpacity = String(1 - progress);
      },
    });
  }, [duration]);
  return ref;
}

const Spinning: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const radius = useMemo(() => 50 - strokeWidth / 2, [strokeWidth]);
  const gRef = useBlinking(duration);
  return (
    <div className="preloader-icon__spinning">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 540">
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

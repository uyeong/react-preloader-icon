import React, { useRef, useEffect, useMemo } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

const partProgress = 0.3333333333333333;
const levelX = [237.5, 425, 50];
const levelY = [50, 425, 425];
const levelCount = 3;

function useTravel(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    const circles = ref.current!.children;
    return loop({
      duration,
      update(n: number) {
        const phase = Math.floor(n / partProgress);
        const progress = (n - partProgress * phase) / partProgress;
        for (let i = 0, t = circles.length; i < t; i = i + 1) {
          let currIndex = phase + i;
          currIndex = currIndex >= levelCount ? currIndex - levelCount : currIndex;
          const prevIndex = currIndex === 0 ? 2 : currIndex - 1;
          const cx = levelX[prevIndex] + progress * (levelX[currIndex] - levelX[prevIndex]);
          const cy = levelY[prevIndex] + progress * (levelY[currIndex] - levelY[prevIndex]);
          circles[i].setAttribute('cx', String(cx));
          circles[i].setAttribute('cy', String(cy));
        }
      },
    });
  }, [duration]);
  return ref;
}

const BallTriangle: React.FC<LoaderProps> = ({ strokeWidth, strokeColor, duration }) => {
  const radius = useMemo(() => 50 - strokeWidth / 2, [strokeWidth]);
  const ref = useTravel(duration);
  return (
    <div className="preloader-icon__ball-triangle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475 475">
        <g
          // @ts-ignore
          ref={ref}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        >
          <circle cx="50" cy="425" r={radius} />
          <circle cx="237.5" cy="50" r={radius} />
          <circle cx="425" cy="425" r={radius} />
        </g>
      </svg>
    </div>
  );
};

export default BallTriangle;

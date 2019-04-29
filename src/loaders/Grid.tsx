import React, { useEffect, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

const delayRates = [0, 0.3, 0.8, 0.1, 0.6, 0.4, 0.7, 0.5, 0.2];

function useBlinking(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    const elements: SVGElement[] = [].slice.call((ref.current as SVGElement).children);
    const cancels: (() => void)[] = [];
    for (let i = 0, n = elements.length; i < n; i = i + 1) {
      cancels[i] = loop({
        duration,
        delay: duration * delayRates[i],
        update(n: number) {
          const progress = Math.abs(1 - n * 2);
          elements[i].setAttribute('fill-opacity', String(0.2 + 0.8 * progress));
        },
      });
    }
    return () => {
      for (let i = 0, n = cancels.length; i < n; i++) {
        cancels[i]();
      }
    }
  }, [duration]);
  return ref;
}

const Grid: React.FC<LoaderProps> = ({ strokeColor, duration }) => {
  const ref = useBlinking(duration);
  return (
    <div className="preloader-icon__grid">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g ref={ref as any} fill={strokeColor}>
          <circle cx="12" cy="12" r="12" />
          <circle cx="50" cy="12" r="12" />
          <circle cx="88" cy="12" r="12" />
          <circle cx="12" cy="50" r="12" />
          <circle cx="50" cy="50" r="12" />
          <circle cx="88" cy="50" r="12" />
          <circle cx="12" cy="88" r="12" />
          <circle cx="50" cy="88" r="12" />
          <circle cx="88" cy="88" r="12" />
        </g>
      </svg>
    </div>
  );
};

export default Grid;

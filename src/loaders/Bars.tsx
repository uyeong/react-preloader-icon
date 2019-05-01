import React, { useEffect, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

const levels = [110, 100, 90, 80, 70, 60, 50, 40, 140, 120];
const partProgress = 0.1;

function getValues(n: number) {
  const currIndex = Math.floor(n / partProgress);
  const prevIndex = currIndex === 0 ? levels.length - 1 : currIndex - 1;
  const progress = (n - partProgress * currIndex) / partProgress;
  const h = levels[prevIndex] + progress * (levels[currIndex] - levels[prevIndex]);
  const y = (140 - h) / 2;
  return [h, y];
}

function useBounce(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    const element = ref.current as SVGElement;
    const [r1, r2, r3, r4, r5] = [].slice.call(element.querySelectorAll('rect')) as SVGElement[];
    const cancel1 = loop({
      duration,
      update(n: number) {
        const [h, y] = getValues(n);
        r3.setAttribute('height', String(h));
        r3.setAttribute('y', String(y));
      },
    });
    const cancel2 = loop({
      duration,
      delay: duration * 0.25,
      update(n: number) {
        const [h, y] = getValues(n);
        r2.setAttribute('height', String(h));
        r4.setAttribute('height', String(h));
        r2.setAttribute('y', String(y));
        r4.setAttribute('y', String(y));
      },
    });
    const cancel3 = loop({
      duration,
      delay: duration * 0.5,
      update(n: number) {
        const [h, y] = getValues(n);
        r1.setAttribute('height', String(h));
        r5.setAttribute('height', String(h));
        r1.setAttribute('y', String(y));
        r5.setAttribute('y', String(y));
      },
    });
    return () => {
      cancel1();
      cancel2();
      cancel3();
    };
  }, [duration]);
  return ref;
}

const Bars: React.FC<LoaderProps> = ({ strokeColor, duration }) => {
  const ref = useBounce(duration);
  return (
    <div className="preloader-icon__bars">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 140">
        <g ref={ref as any} fill={strokeColor}>
          <rect x="0" y="10" width="15" height="120" rx="6" />
          <rect x="30" y="10" width="15" height="120" rx="6" />
          <rect x="60" y="0" width="15" height="140" rx="6" />
          <rect x="90" y="10" width="15" height="120" rx="6" />
          <rect x="120" y="10" width="15" height="120" rx="6" />
        </g>
      </svg>
    </div>
  );
};

export default Bars;

import React, { useEffect, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

function useThump(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    const element = ref.current as SVGElement;
    const [c1, c2, c3] = [].slice.call(element.querySelectorAll('circle')) as SVGElement[];
    return loop({
      duration,
      update(n: number) {
        const progress1 = n <= 0.5 ? n * 2 : (1 - n) * 2;
        const progress2 = 1 - progress1;
        c1.setAttribute('r', String(9 + 6 * progress2));
        c2.setAttribute('r', String(9 + 6 * progress1));
        c3.setAttribute('r', String(9 + 6 * progress2));
        c1.setAttribute('fill-opacity', String(0.5 + 0.5 * progress2));
        c2.setAttribute('fill-opacity', String(0.5 + 0.5 * progress1));
        c3.setAttribute('fill-opacity', String(0.5 + 0.5 * progress2));
      },
    });
  }, [duration]);
  return ref;
}

const ThreeDots: React.FC<LoaderProps> = ({ strokeColor, duration }) => {
  const ref = useThump(duration);
  return (
    <div className="preloader-icon__three-dots">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 30">
        <g ref={ref as any} fill={strokeColor}>
          <circle cx="15" cy="15" r="15" />
          <circle cx="60" cy="15" r="9" />
          <circle cx="105" cy="15" r="15" />
        </g>
      </svg>
    </div>
  );
};

export default ThreeDots;

import React, { useEffect, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

const radius = 50;
const spreadLevel = [1, 2.2, 4.4, 6.7, 8.9, 11.1, 13.3];
const partProgress = 0.14285714285714285; // 1 / spreadLevel.length;

function useSpread(strokeWidth: number, duration: number) {
  const c1Ref = useRef<SVGElement>();
  const c2Ref = useRef<SVGElement>();
  const c3Ref = useRef<SVGElement>();
  useEffect(() => {
    const cancel1 = loop({
      duration: duration / 2,
      update(n) {
        const currIndex = Math.floor(n / partProgress);
        const prevIndex = currIndex === 0 ? spreadLevel.length - 1 : currIndex - 1;
        const progress = (n - partProgress * currIndex) / partProgress;
        const r = spreadLevel[prevIndex] + progress * (spreadLevel[currIndex] - spreadLevel[prevIndex]);
        (c3Ref.current as SVGElement).setAttribute('r', String(r));
      },
    });
    const cancel2 = loop({
      duration,
      delay: duration / 2,
      update(n) {
        (c1Ref.current as SVGElement).setAttribute('r', String(n * (radius - 13.3) + 13.3));
        (c1Ref.current as SVGElement).setAttribute('stroke-opacity', String(1 - n));
        (c1Ref.current as SVGElement).setAttribute('stroke-width', String(strokeWidth - strokeWidth * n));
      },
    });
    const cancel3 = loop({
      duration,
      delay: duration,
      update(n) {
        (c2Ref.current as SVGElement).setAttribute('r', String(n * (radius - 13.3) + 13.3));
        (c2Ref.current as SVGElement).setAttribute('stroke-opacity', String(1 - n));
        (c2Ref.current as SVGElement).setAttribute('stroke-width', String(strokeWidth - strokeWidth * n));
      },
    });
    return () => {
      cancel1();
      cancel2();
      cancel3();
    };
  }, [duration, strokeWidth]);
  return [c1Ref, c2Ref, c3Ref];
}

const Rings: React.FC<LoaderProps> = ({ strokeColor, strokeWidth, duration }) => {
  const [c1Ref, c2Ref, c3Ref] = useSpread(strokeWidth, duration);
  return (
    <div className="preloader-icon__oval">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">
        <g stroke={strokeColor} strokeWidth={strokeWidth} fill="none">
          <circle ref={c1Ref as any} cx="0" cy="0" r="13.3" strokeOpacity="0" />
          <circle ref={c2Ref as any} cx="0" cy="0" r="13.3" strokeOpacity="0" />
          <circle ref={c3Ref as any} cx="0" cy="0" r="13.3" />
        </g>
      </svg>
    </div>
  );
};

export default Rings;

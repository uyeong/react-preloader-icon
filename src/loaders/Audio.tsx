import React, { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { LoaderProps } from '../Preloader';

const levels = [
  [56.25, 71.25, 100, 80, 40, 82.5, 56.25, 80, 28.75, 82.5, 16.25, 80, 70, 42.5, 42.5, 0.25, 28.75, 95, 98.75, 25],
  [68.75, 41.25, 6.25, 93.75, 28.75, 91.25, 41.25, 15, 17.5, 75, 100],
  [62.5, 42.5, 97.5, 28.75, 70, 28.75, 42.5, 95, 100, 67.5, 26.25, 62.25],
  [37.5, 56.25, 16.25, 100, 70, 90, 56.25, 95, 42.5, 28.75, 71.25, 37.5],
];

function useRollerCoaster(ref: MutableRefObject<SVGRectElement | undefined>, level: number[], duration: number) {
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const partProgress = 1 / level.length;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        let progress = pastTime / duration;
        progress = progress >= 1 ? 0.9999 : progress;
        const currIndex = Math.floor(progress / partProgress);
        const prevIndex = currIndex === 0 ? level.length - 1 : currIndex - 1;
        progress = (progress - partProgress * currIndex) / partProgress;
        const h = level[prevIndex] + progress * (level[currIndex] - level[prevIndex]);
        (ref.current as SVGElement).setAttribute('height', String(h));
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

const Audio: React.FC<LoaderProps> = ({ strokeColor, duration }) => {
  const ref1 = useRef<SVGRectElement>();
  const ref2 = useRef<SVGRectElement>();
  const ref3 = useRef<SVGRectElement>();
  const ref4 = useRef<SVGRectElement>();
  const refs = [ref1, ref2, ref3, ref4];
  for (let i = 0, n = refs.length; i < n; i = i + 1) {
    const time = useMemo(() => (i === 0 ? duration * 2.15 : i === 2 ? duration * 0.7 : duration), [duration]);
    useRollerCoaster(refs[i], levels[i], time);
  }
  return (
    <div className="preloader-icon__audio">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.75 100">
        <g transform="matrix(1 0 0 -1 0 100)" fill={strokeColor} strokeWidth={0}>
          <rect
            // @ts-ignore
            ref={ref1}
            width="12.5"
            height="25"
            rx="3.75"
          />
          <rect
            // @ts-ignore
            ref={ref2}
            x="18.75"
            width="12.5"
            height="100"
            rx="3.75"
          />
          <rect
            // @ts-ignore
            ref={ref3}
            x="37.5"
            width="12.5"
            height="62.5"
            rx="3.75"
          />
          <rect
            // @ts-ignore
            ref={ref4}
            x="56.25"
            width="12.5"
            height="37.5"
            rx="3.75"
          />
        </g>
      </svg>
    </div>
  );
};

export default Audio;

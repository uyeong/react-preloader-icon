import React, { useEffect, useRef } from 'react';
import { LoaderProps } from '../Preloader';

const radius = 50;
const spreadLevel = [1, 2.2, 4.4, 6.7, 8.9, 11.1, 13.3];
const partProgress = 0.14285714285714285; // 1 / spreadLevel.length;

function useSpread(strokeWidth: number, duration: number) {
  const c1Ref = useRef<SVGElement>();
  const c2Ref = useRef<SVGElement>();
  const c3Ref = useRef<SVGElement>();
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const halfDuration = duration / 2;
      let startTime: number;
      let act1 = false;
      let act2 = false;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        {
          // Animation of First Circle
          let progress = (pastTime > halfDuration ? pastTime - halfDuration : pastTime) / halfDuration;
          progress = progress >= 1 ? 0.9999 : progress;
          const currIndex = Math.floor(progress / partProgress);
          const prevIndex = currIndex === 0 ? spreadLevel.length - 1 : currIndex - 1;
          progress = (progress - partProgress * currIndex) / partProgress;
          const h = spreadLevel[prevIndex] + progress * (spreadLevel[currIndex] - spreadLevel[prevIndex]);
          (c3Ref.current as SVGElement).setAttribute('r', String(h));
        }
        // Animation of Second Circle
        if (!act1 && pastTime >= halfDuration) {
          act1 = true;
        }
        if (act1) {
          let progress = pastTime / duration - 0.5;
          progress = progress <= 0 ? progress + 1 : progress;
          (c1Ref.current as SVGElement).setAttribute('r', String(progress * (radius - 13.3) + 13.3));
          (c1Ref.current as SVGElement).setAttribute('stroke-opacity', String(1 - progress));
          (c1Ref.current as SVGElement).setAttribute('stroke-width', String(strokeWidth - strokeWidth * progress));
        }
        // Animation of Third Circle
        if (!act2 && pastTime >= duration) {
          act2 = true;
        }
        if (act2) {
          const progress = pastTime / duration;
          (c2Ref.current as SVGElement).setAttribute('r', String(progress * (radius - 13.3) + 13.3));
          (c2Ref.current as SVGElement).setAttribute('stroke-opacity', String(1 - progress));
          (c2Ref.current as SVGElement).setAttribute('stroke-width', String(strokeWidth - strokeWidth * progress));
        }
        if (pastTime >= duration) {
          startTime = timestamp;
        }
        reqId = window.requestAnimationFrame(step);
      };
      reqId = window.requestAnimationFrame(step);
    }
    return () => window.cancelAnimationFrame(reqId);
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

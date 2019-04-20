import { MutableRefObject, useEffect } from 'react';

export default function useBlinking(ref: MutableRefObject<SVGElement | undefined>, duration: number) {
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const elements: SVGElement[] = [].slice.call((ref.current as SVGElement).children);
      const count = elements.length;
      const partProgress = 1 / count;
      let prevIndex = 0;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        let progress = pastTime / duration;
        progress = progress >= 1 ? 0.9999 : progress;
        const nextIndex = Math.floor(progress / partProgress);
        let nextTarget;
        let prevTarget;
        if (nextIndex - 1 !== prevIndex && !(nextIndex === 0 && prevIndex === count - 1)) {
          prevTarget = elements[prevIndex];
          prevTarget.style.fillOpacity = '0';
          prevIndex = nextIndex === 0 ? count - 1 : nextIndex - 1;
        }
        progress = (progress - partProgress * nextIndex) / partProgress;
        nextTarget = elements[nextIndex];
        prevTarget = elements[prevIndex];
        nextTarget.style.fillOpacity = String(progress);
        prevTarget.style.fillOpacity = String(1 - progress);
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

import { MutableRefObject, useEffect } from 'react';

export default function useRotate(ref: MutableRefObject<SVGElement | undefined>, duration: number) {
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const pathElement = ref.current as SVGElement;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        const progress = pastTime / duration;
        const deg = progress <= 1 ? progress * 360 : 360;
        pathElement.setAttribute('transform', `rotate(${deg})`);
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

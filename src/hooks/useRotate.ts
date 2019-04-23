import { useEffect, useRef } from 'react';

export default function useRotate(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    let reqId: number;
    if (duration > 0) {
      const element = ref.current as SVGElement;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        const progress = pastTime / duration;
        const deg = progress <= 1 ? progress * 360 : 360;
        element.setAttribute('transform', `rotate(${deg})`);
        if (pastTime >= duration) {
          startTime = timestamp;
        }
        reqId = window.requestAnimationFrame(step);
      };
      reqId = window.requestAnimationFrame(step);
    }
    return () => window.cancelAnimationFrame(reqId);
  }, [duration]);
  return ref;
}

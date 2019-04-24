import { useEffect, useRef } from 'react';
import stepper, { StepperInstance } from '../utils/stepper';

export default function useRotate(duration: number) {
  const ref = useRef<SVGElement>();
  useEffect(() => {
    let step: StepperInstance | undefined;
    if (duration > 0) {
      const element = ref.current as SVGElement;
      step = stepper()
        .duration(duration)
        .infinity(true)
        .update(n => {
          const deg = n <= 1 ? n * 360 : 360;
          element.setAttribute('transform', `rotate(${deg})`);
        })
        .start();
    }
    return () => (step && step.stop(), undefined);
  }, [duration]);
  return ref;
}

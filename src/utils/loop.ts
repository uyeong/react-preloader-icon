interface Options {
  duration: number;
  delay?: number;
  update: (n: number) => void;
}

export type CancelHandler = () => void;

export default function loop(options: Options): CancelHandler {
  const { duration, delay = 0, update } = options;
  let startTime: number;
  let reqId: number;
  const step = (timestamp: number) => {
    if (!startTime) {
      startTime = timestamp + delay;
    }
    if (timestamp > startTime) {
      const pastTime = timestamp - startTime;
      const progress = (pastTime % duration) / duration;
      if (update) {
        update(progress);
      }
    }
    reqId = window.requestAnimationFrame(step);
  };
  reqId = window.requestAnimationFrame(step);
  return () => window.cancelAnimationFrame(reqId);
}

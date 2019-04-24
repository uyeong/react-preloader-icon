export interface StepperInstance {
  delay: (n: number) => StepperInstance;
  duration: (n: number) => StepperInstance;
  easing: (fn: (n: number) => number) => StepperInstance;
  infinity: (b: boolean) => StepperInstance;
  update: (fn: (n: number) => void) => StepperInstance;
  start: () => StepperInstance;
  stop: () => StepperInstance;
}

// tslint:disable-next-line
const steps: ((n: number) => void)[] = [];
let reqId: number | undefined;

function running() {
  if (reqId !== undefined) {
    return;
  }
  const loop = (timestamp: number) => {
    const stepCount = steps.length;
    if (stepCount > 0) {
      for (let i = 0, n = stepCount; i < n; i = i + 1) {
        if (steps[i] === undefined) {
          break;
        }
        steps[i](timestamp);
      }
      reqId = window.requestAnimationFrame(loop);
    }
    if (stepCount === 0) {
      terminate();
    }
  };
  reqId = window.requestAnimationFrame(loop);
}

function terminate() {
  if (reqId === undefined) {
    return;
  }
  window.cancelAnimationFrame(reqId);
  reqId = undefined;
}

export default function stepper(): StepperInstance {
  // Option Values
  let delay = 0;
  let duration = 1000;
  let infinity = false;
  let easing = (n: number) => n;
  let update: (n: number) => void | undefined;
  // Process Values
  let step: ((n: number) => void) | undefined;
  // Status Values
  let isPlaying = false;
  return {
    delay(n: number) {
      delay = n;
      return this;
    },
    duration(n: number) {
      duration = n;
      return this;
    },
    easing(fn: (n: number) => number) {
      easing = fn;
      return this;
    },
    infinity(b: boolean) {
      infinity = b;
      return this;
    },
    update(fn: (n: number) => void) {
      update = fn;
      return this;
    },
    start() {
      if (duration === 0 || isPlaying) {
        return this;
      }
      let startTime: number;
      let doing = false;
      step = timestamp => {
        if (!startTime) {
          startTime = timestamp;
        }
        const pastTime = timestamp - startTime;
        if (!doing && pastTime >= delay) {
          startTime = timestamp;
          doing = true;
          return;
        }
        if (doing) {
          let progress = pastTime / duration;
          progress = progress > 1 ? 1 : progress;
          progress = easing ? easing(progress) : progress;
          if (update) {
            update(progress);
          }
          if (pastTime >= duration) {
            infinity ? (startTime = timestamp) : this.stop();
          }
        }
      };
      steps.push(step);
      isPlaying = true;
      if (reqId === undefined) {
        running();
      }
      return this;
    },
    stop() {
      if (!isPlaying) {
        return this;
      }
      steps.splice(steps.indexOf(step as (n: number) => void), 1);
      step = undefined;
      isPlaying = false;
      return this;
    },
  };
}

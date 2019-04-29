import React, { useEffect, useMemo, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

interface AudioBarProps {
  index: number;
  x: number;
  width: number;
  height: number;
  rx: number;
  level: number[];
  duration: number;
}

const barData = [
  {
    x: 0,
    width: 12.5,
    height: 25,
    rx: 3.75,
    // prettier-ignore
    level: [56.25, 71.25, 100, 80, 40, 82.5, 56.25, 80, 28.75, 82.5, 16.25, 80, 70, 42.5, 42.5, 0.25, 28.75, 95, 98.75, 25]
  },
  {
    x: 18.75,
    width: 12.5,
    height: 100,
    rx: 3.75,
    level: [68.75, 41.25, 6.25, 93.75, 28.75, 91.25, 41.25, 15, 17.5, 75, 100],
  },
  {
    x: 37.5,
    width: 12.5,
    height: 62.5,
    rx: 3.75,
    level: [62.5, 42.5, 97.5, 28.75, 70, 28.75, 42.5, 95, 100, 67.5, 26.25, 62.25],
  },
  {
    x: 56.25,
    width: 12.5,
    height: 37.5,
    rx: 3.75,
    level: [37.5, 56.25, 16.25, 100, 70, 90, 56.25, 95, 42.5, 28.75, 71.25, 37.5],
  },
];

function useRollerCoaster(level: number[], duration: number) {
  const ref = useRef<SVGElement | undefined>();
  useEffect(() => {
    const partProgress = 1 / level.length;
    return loop({
      duration,
      update(n: number) {
        const currIndex = Math.floor(n / partProgress);
        const prevIndex = currIndex === 0 ? level.length - 1 : currIndex - 1;
        const progress = (n - partProgress * currIndex) / partProgress;
        const h = level[prevIndex] + progress * (level[currIndex] - level[prevIndex]);
        (ref.current as SVGElement).setAttribute('height', String(h));
      },
    });
  }, [duration]);
  return ref;
}

const AudioBar: React.FC<AudioBarProps> = ({ index, x, width, height, rx, level, duration }) => {
  const time = useMemo(() => (index === 0 ? duration * 2.15 : index === 2 ? duration * 0.7 : duration), [duration]);
  const ref = useRollerCoaster(level, time);
  return <rect ref={ref as any} x={x} width={width} height={height} rx={rx} />;
};

const Audio: React.FC<LoaderProps> = ({ strokeColor, duration }) => {
  const barList = [];
  for (let i = 0, n = barData.length; i < n; i = i + 1) {
    const data = barData[i];
    barList[i] = <AudioBar {...data} key={i} index={i} duration={duration} />;
  }
  return (
    <div className="preloader-icon__audio">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.75 100">
        <g transform="matrix(1 0 0 -1 0 100)" fill={strokeColor} strokeWidth={0}>
          {barList}
        </g>
      </svg>
    </div>
  );
};

export default Audio;

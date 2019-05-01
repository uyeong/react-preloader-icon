import React, { useEffect, useMemo, useRef } from 'react';
import { LoaderProps } from '../Preloader';
import loop from '../utils/loop';

interface AudioBarProps {
  index: number;
  level: number[];
  duration: number;
}

const levels = [
  [45, 57, 80, 64, 32, 66, 45, 64, 23, 66, 13, 64, 56, 34, 34, 2, 23, 76, 79, 20],
  [55, 33, 5, 75, 23, 73, 33, 12, 14, 60, 80],
  [34, 78, 23, 56, 23, 34, 76, 80, 54, 21, 50],
  [45, 13, 80, 56, 72, 45, 76, 34, 23, 67, 30],
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

const AudioBar: React.FC<AudioBarProps> = ({ index, level, duration }) => {
  const time = useMemo(() => (index === 0 ? duration * 2.15 : index === 2 ? duration * 0.7 : duration), [duration]);
  const ref = useRollerCoaster(level, time);
  return <rect ref={ref as any} x={index * 15} rx="3" width="10" height={level[level.length - 1]} />;
};

const Audio: React.FC<LoaderProps> = ({ strokeColor, duration }) => {
  const audioBars = [];
  for (let i = 0, n = levels.length; i < n; i = i + 1) {
    audioBars.push(<AudioBar key={i} index={i} level={levels[i]} duration={duration} />);
  }
  return (
    <div className="preloader-icon__audio">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 80">
        <g transform="matrix(1 0 0 -1 0 80)" fill={strokeColor} strokeWidth={0}>
          {audioBars}
        </g>
      </svg>
    </div>
  );
};

export default Audio;

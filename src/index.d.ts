import React, { CSSProperties } from 'react';

interface LoaderProps {
  strokeWidth: number;
  strokeColor: string;
  duration: number;
}

interface PreloaderProps {
  className?: string;
  style?: CSSProperties;
  use: React.FC<LoaderProps>;
  size?: number | string;
  strokeWidth?: number;
  strokeColor?: string;
  duration?: number;
}

export const Audio: React.FC<LoaderProps>;
export const Oval: React.FC<LoaderProps>;
export const TailSpin: React.FC<LoaderProps>;
export const Spinning: React.FC<LoaderProps>;
export const Puff: React.FC<LoaderProps>;
export const Preloader: React.FC<PreloaderProps>;

import React, { CSSProperties } from 'react';

interface LoaderProps {
  strokeWidth: number;
  strokeColor: string;
  duration: number;
}

interface PreloaderProps {
  className?: string;
  style?: CSSProperties;
  loader: React.FC<LoaderProps>;
  size?: number | string;
  strokeWidth?: number;
  strokeColor?: string;
  duration?: number;
}

export const Oval: React.FC<LoaderProps>;

declare const PreloaderIcon: React.FC<PreloaderProps>;

export default PreloaderIcon;

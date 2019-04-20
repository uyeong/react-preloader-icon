import { useMemo } from 'react';

export default function useRadius(strokeWidth: number) {
  return useMemo(() => 50 - strokeWidth / 2, [strokeWidth]);
}

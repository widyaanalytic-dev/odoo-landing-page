import { useCallback, useState } from 'react';
import { useSlideInView } from './useSlideInView';

export function useSlideVisibility(slideIndex: number, threshold = 0.45): boolean {
  const [visible, setVisible] = useState(false);
  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);
  useSlideInView(onEnter, onLeave, { slideIndex, threshold });
  return visible;
}

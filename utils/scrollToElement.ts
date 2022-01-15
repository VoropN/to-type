import { RefObject } from 'react';

type IScrollToElement = {
  offsetTop: number;
  selectedRef: RefObject<HTMLElement>;
  forceScroll?: boolean;
};

export const scrollToElement = ({
  offsetTop,
  selectedRef,
  forceScroll,
}: IScrollToElement) => {
  if (!selectedRef.current) return;
  const positionFromTop = selectedRef.current.offsetTop;
  const scrollHeight = window.scrollY;
  const visibleHeight = window.innerHeight;
  const padding =
    parseInt(window.getComputedStyle(selectedRef.current).fontSize) - 2;
  const headerBottom = positionFromTop - offsetTop - padding;
  const topMargin = scrollHeight - headerBottom;
  const bottomMargin = positionFromTop + offsetTop / 2 - visibleHeight;

  if (topMargin > 0 || bottomMargin > scrollHeight || forceScroll) {
    window.scroll({ top: headerBottom, behavior: 'smooth' });
  }
};

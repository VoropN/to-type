import { RefObject } from "react";

type IScrollToElement = {
  headerRef: RefObject<HTMLElement | any>;
  selectedRef: RefObject<HTMLElement | any>;
  forceScroll?: boolean;
};

export const scrollToElement = ({ headerRef, selectedRef, forceScroll }: IScrollToElement) => {
  if (!headerRef.current || !selectedRef.current) return;
  const positionFromTop = selectedRef.current.offsetTop;
  const scrollHeight = window.scrollY;
  const visibleHeight = window.innerHeight;
  const headerHeight = headerRef.current?.offsetHeight;
  const padding = parseInt(window.getComputedStyle(selectedRef.current).fontSize) - 2;
  const headerBottom = positionFromTop - headerHeight - padding;
  const topMargin = scrollHeight - headerBottom;
  const bottomMargin = positionFromTop + headerHeight / 2 - visibleHeight;

  if (topMargin > 0 || bottomMargin > scrollHeight || forceScroll) {
      window.scroll({ top: headerBottom, behavior: "smooth" });
  }
}

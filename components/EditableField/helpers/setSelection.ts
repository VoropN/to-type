import { RefObject } from 'react';

type ISetSelection = {
  ref: RefObject<HTMLElement>;
  offset?: number;
  shouldCollapse?: boolean;
};

export const setCaret = ({
  ref,
  offset = 1,
  shouldCollapse = false,
}: ISetSelection) => {
  setTimeout(() => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (!ref.current || !selection) return;
    const node = ref.current.childNodes[0];
    range.setStart(node, 0);
    range.setEnd(node, offset);
    shouldCollapse && range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }, 0);
};

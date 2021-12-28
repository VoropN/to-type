import { RefObject } from 'react';

type ISetSelection = {
  ref: RefObject<HTMLElement>;
  offset?: number;
};

export const selectNode = ({ ref }: ISetSelection) => {
  if (!ref.current) return;
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(ref.current);
  selection?.removeAllRanges();
  selection?.addRange(range);
}


export const setCaret = ({ ref, offset = 1 }: ISetSelection) => {
  if (!ref.current) return;
  const range = document.createRange();
  const selection = window.getSelection();

  range.setStart(ref.current, 1)
  range.collapse(true)

  selection?.removeAllRanges();
  selection?.addRange(range);
}


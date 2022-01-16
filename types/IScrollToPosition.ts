export type IScrollToPositionFunc = (props: { forceScroll?: boolean }) => void;

export interface IScrollOptions {
  counter: number;
  forceScroll: boolean;
}

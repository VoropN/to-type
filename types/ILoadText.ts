export interface ITextOptions {
  name: string;
  size?: number;
  lastModified?: number;
  lastModifiedDate?: Date;
  type?: 'text/html' | 'text/plain' | string;
}

export interface IText {
  text: string;
  options: ITextOptions;
}

export type ILoadTextFunc = (props: IText) => void;

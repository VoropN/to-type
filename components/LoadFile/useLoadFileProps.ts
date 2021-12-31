import {ChangeEvent, useRef, useState} from "react";
import {ILoadFile} from "./";

export interface ITextOptions {
  name: string;
  size?: number;
  lastModified?: number;
  lastModifiedDate?: Date;
  type?: "text/html" | "text/plain" | string;
}

export interface ILoadedFileData {
  content: string | ArrayBuffer
  textOptions: ITextOptions
}

export interface IUseLoadFileProps {
  data: {
    text: string;
    textOptions: ITextOptions
  };
}

export const useLoadFileProps = ({data}: IUseLoadFileProps): ILoadFile => {
  const [text, setText] = useState(data.text || '');
  const [textOptions, setTextOptions] = useState(data.textOptions);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileButtonRef = useRef<HTMLInputElement>(null);

  const updateText = ({content, textOptions} : ILoadedFileData) => {
    setTextOptions(textOptions)
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(content as string, 'text/html');
    const result = htmlDoc.body.textContent
      ?.replace(/[^A-Za-z0-9-.,!?#$%&@№*(){}_=+<>`"'|;:~/\\\[\]\n\r—\s^]/g, '')
      .replace(/\s{3,}|\r/g, '\n')
      .replace(/\n+\s*/g, '�')
      .replace(/\s+/, ' ')
      .replace(/�/g, '\n') || '';
    setText(result.slice(0, 1000));
    setText(result);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const content = ev.target?.result;
        content && updateText({ content, textOptions: file });
        setLoading(false);
        fileButtonRef.current?.blur();
      }
      reader.onerror = (errors) => setErrors?.(errors);
      reader.readAsText(file);
    }
  }

  return {
    fileButtonRef,
    text,
    textOptions,
    errors,
    onChange,
    isLoading,
    setText,
    setErrors,
    setLoading,
  }
}

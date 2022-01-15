import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { ILoadTextFunc, ITextOptions } from 'types/ILoadText';

export interface ILoadedFileData {
  content: string;
  options: ITextOptions;
}

export interface IUseLoadFileProps {
  loadText: ILoadTextFunc;
}

enum TextType {
  CSV = 'text/csv',
  HTML = 'text/html',
  TXT = 'text/plain',
}

export const useLoadFileProps = ({ loadText }: IUseLoadFileProps) => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileButtonRef = useRef<HTMLInputElement>(null);

  const updateText = useCallback(
    ({ content, options }: ILoadedFileData) => {
      if (options.type === TextType.HTML) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(content as string, 'text/html');
        content = htmlDoc.body.textContent || '';
      }

      const text = content
        ?.replace(/[^A-Za-z0-9-.,!?#$%&@№*(){}_=+<>`"'|;:~/\\[\]\n\r—\s^]/g, '')
        .replace(/\s{3,}|\r/g, '\n')
        .replace(/\n+\s*/g, '�')
        .replace(/\s+/, ' ')
        .replace(/�/g, '\n');

      loadText({ text, options });
    },
    [loadText]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target?.files?.[0];

      if (file) {
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          const content = ev.target?.result as string;
          content && updateText({ content, options: file });
          setLoading(false);
          fileButtonRef.current?.blur();
        };
        reader.onerror = (errors) => setErrors?.(errors);
        reader.readAsText(file);
      }
    },
    [setLoading, updateText, setErrors]
  );

  return {
    fileButtonRef,
    errors,
    onChange,
    isLoading,
    setErrors,
    setLoading,
  };
};

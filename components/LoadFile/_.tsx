import styles from './styles.module.scss';
import {ChangeEvent, memo, useRef} from "react";

interface ILoadFile {
  setText: (options: ILoadedFileData) => void;
  setLoading: (isLoading: boolean) => void;
  setError?: (errors: any) => void;
}
export interface ILoadedFileData {
  content: string | ArrayBuffer
  textOptions: {
    name: string;
    size: number;
    lastModified: number;
    lastModifiedDate?: Date;
    type: "text/html" | "text/plain" | string;
  };
}

const LoadFile = ({setText, setLoading, setError}: ILoadFile) => {
  const ref = useRef<HTMLInputElement>(null);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const content = ev.target?.result;
        content && setText({ content, textOptions: file });
        setLoading(false);
        ref.current?.blur();
      }
      reader.onerror = (errors) => setError?.(errors);
      reader.readAsText(file);
    }
  }
  return (
    <div className={styles.container}>
      <input type="file"
             placeholder='choose text'
             accept="text/plain, text/html"
             onChange={onChange}
             ref={ref}
      />
    </div>
  )
}

export default memo(LoadFile);


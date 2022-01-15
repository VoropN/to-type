import { ChangeEvent, Dispatch, memo, SetStateAction, RefObject } from 'react';
import styles from './styles.module.scss';
import { ITextOptions } from './useLoadFileProps';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export interface ILoadFile {
  text: string;
  isLoading: boolean;
  errors: any;
  setText: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setErrors?: Dispatch<SetStateAction<any>>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fileButtonRef: RefObject<any>;
  textOptions: ITextOptions;
}

const LoadFile = ({ fileButtonRef, onChange, textOptions }: ILoadFile) => {
  return (
    <label className={styles.container} tabIndex={-1}>
      <input
        className={styles.fileInput}
        tabIndex={-1}
        type="file"
        placeholder="choose text"
        accept="text/plain, text/html"
        onChange={onChange}
        ref={fileButtonRef}
      />
      <h4 className={styles.name}>{textOptions.name}</h4>
      <div className={styles.hint}>
        Upload text to type (.txt|.html)
        <UploadFileIcon color="inherit" />
      </div>
    </label>
  );
};

export default memo(LoadFile);

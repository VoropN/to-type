import {ChangeEvent, Dispatch, memo, SetStateAction, Ref} from "react";
import styles from './styles.module.scss';
import {ITextOptions} from "./useLoadFileProps";

export interface ILoadFile {
  text: string;
  isLoading: boolean;
  errors: any;
  setText: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>
  setErrors?: Dispatch<SetStateAction<any>>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fileButtonRef: Ref<HTMLInputElement>;
  textOptions: ITextOptions
}


const LoadFile = ({fileButtonRef, onChange}: ILoadFile) => {
  return (
    <div className={styles.container}>
      <input type="file"
             placeholder='choose text'
             accept="text/plain, text/html"
             onChange={onChange}
             ref={fileButtonRef}
      />
    </div>
  )
}

export default memo(LoadFile);


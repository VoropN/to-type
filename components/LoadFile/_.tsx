import { memo } from 'react';
import styles from './styles.module.scss';
import { useLoadFileProps } from './useLoadFileProps';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton } from '@mui/material';
import { ILoadTextFunc } from 'types/ILoadText';

const LoadFile = ({ loadText }: { loadText: ILoadTextFunc }) => {
  const { onChange, isLoading, fileButtonRef } = useLoadFileProps({ loadText });

  return (
    <div className={styles.container} tabIndex={-1}>
      <div className={styles.hint}>
        Upload text to type (.txt|.html)
        {isLoading ? (
          '...loading'
        ) : (
          <IconButton aria-label="upload text" component="label" size="small">
            <input
              className={styles.fileInput}
              tabIndex={-1}
              type="file"
              placeholder="choose text"
              accept="text/plain, text/html"
              onChange={onChange}
              ref={fileButtonRef}
            />
            <UploadFileIcon color="inherit" fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default memo(LoadFile);

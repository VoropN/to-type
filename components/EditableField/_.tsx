import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { lightGreen } from '@mui/material/colors';
import { setCaret } from './helpers';

export interface IEditableField {
  onEdit: any;
  onChange: any;
  children: any;
}

const EditableField = ({ children, onEdit, onChange }: IEditableField) => {
  const [isContentEditable, setContentEditable] = useState(false);
  const [content, setContent] = useState(children);

  useEffect(() => {
    if (isContentEditable) return;
    setContent(children);
  }, [children, isContentEditable]);

  const ref = useRef<HTMLDivElement>(null);
  const onInput = (event: ChangeEvent<any>) => {
    onChange?.(event.target.textContent);
  };
  const onApply = (event: ChangeEvent<any>) => {
    setContentEditable(false);
    onEdit(false);
    event.target?.blur();
    ref.current?.blur();
  };
  const onCancel = () => {
    if (!ref.current) return;
    setContentEditable(false);
    onChange?.(content);
    setContent(content);
    ref.current.textContent = content;
    onEdit(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
  };
  const setEdit = () => {
    setContentEditable(true);
    setContent(children);
    onEdit(true);
    setCaret({ ref, offset: String(children).length });
  };
  const onBlur = useCallback(
    (event) => {
      if (event.currentTarget?.contains(event?.relatedTarget) || !ref.current)
        return;
      onCancel();
    },
    [content]
  );
  const actions = isContentEditable && {
    onClick: setEdit,
    onInput,
    contentEditable: isContentEditable,
    suppressContentEditableWarning: true,
  };
  const containerActions = isContentEditable && { onBlur };

  return (
    <div className={styles.container} {...containerActions}>
      <div
        {...actions}
        aria-hidden="true"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {isContentEditable ? (
        <div className={styles.buttons}>
          <IconButton size="small" onClick={onApply}>
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onCancel}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <div className={styles.buttons}>
          <IconButton size="small" onClick={setEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default memo(EditableField);

import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { setCaret } from './helpers';

export interface IEditableField {
  onChange: (text: string) => void;
  children: any;
  onEdit: (isEditable: boolean) => void;
  isEditable: boolean;
}

const EditableField = ({
  children,
  onEdit,
  onChange,
  isEditable,
}: IEditableField) => {
  const [content, setContent] = useState(children);

  useEffect(() => {
    if (isEditable) {
      setContent(children);
      setCaret({ ref, offset: String(children).length });
    }
  }, [isEditable]);

  const ref = useRef<HTMLDivElement>(null);
  const onInput = (event: ChangeEvent<any>) => {
    onChange?.(event.target.textContent);
  };
  const onApply = (event: ChangeEvent<any>) => {
    onEdit(false);
  };
  const onCancel = () => {
    if (!ref.current) return;
    onChange?.(content);
    setContent(content);
    ref.current.textContent = content;
    onEdit(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
  };
  const setEdit = () => {
    setContent(children);
    onEdit(true);
  };
  const onBlur = useCallback(
    (event) => {
      if (
        (event.currentTarget?.contains(event?.relatedTarget) ?? true) ||
        !ref.current
      )
        return;
      onCancel();
    },
    [content]
  );

  const actions = isEditable
    ? {
        onInput,
        contentEditable: isEditable,
        suppressContentEditableWarning: true,
        dangerouslySetInnerHTML: { __html: content },
      }
    : { dangerouslySetInnerHTML: { __html: children } };
  const containerActions = isEditable
    ? { onBlur }
    : {
        'aria-hidden': true,
        onClick: setEdit,
      };

  return (
    <div className={styles.container} {...containerActions}>
      <div {...actions} ref={ref} />
      {isEditable ? (
        <div className={styles.buttons}>
          <IconButton size="small" onClick={onApply}>
            <CheckIcon tabIndex={-1} fontSize="small" color="success" />
          </IconButton>
          <IconButton size="small" onClick={onCancel}>
            <CloseIcon fontSize="small" color="warning" />
          </IconButton>
        </div>
      ) : (
        <div className={styles.buttons}>
          <IconButton size="small" onClick={setEdit}>
            <EditIcon fontSize="small" color="disabled" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default memo(EditableField);

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import cn from 'classnames';
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles.module.scss';
import { setCaret } from './utils';

export interface IEditableField {
  onEdit: (isEditable: boolean) => void;
  onChange: (text: string) => void;
  children: any;
  isEditable: boolean;
  onValidate?: (text: string) => boolean;
}

const EditableField = ({
  children,
  onEdit,
  onChange,
  isEditable,
  onValidate,
}: IEditableField) => {
  const [content, setContent] = useState(children);

  useEffect(() => {
    if (isEditable) {
      setContent(children);
      setCaret({ ref, offset: String(children).length });
    }
  }, [isEditable]);

  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = (event: ChangeEvent<any>) => {
    const value = event.target.textContent;
    if (onValidate && !onValidate(value)) {
      onChange?.(content);
    } else {
      onChange?.(value);
    }
  };
  const onApply = () => {
    onEdit?.(false);
    if (!ref.current) return;
    ref.current.textContent = children;
  };
  const onCancel = () => {
    if (!ref.current) return;
    onChange?.(content);
    setContent(content);
    ref.current.textContent = content;
    onEdit?.(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
  };
  const setEdit = () => {
    setContent(children);
    onEdit?.(true);
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
    [content],
  );

  const actions = isEditable
    ? {
        onKeyDown,
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
      &nbsp;
      <mark
        {...actions}
        ref={ref}
        className={cn(styles.field, { [styles.isEditable]: isEditable })}
      />
      {isEditable ? (
        <div className={styles.buttons}>
          <IconButton size="small" onClick={onApply}>
            <CheckIcon tabIndex={-1} fontSize="inherit" color="success" />
          </IconButton>
          <IconButton size="small" onClick={onCancel}>
            <CloseIcon fontSize="inherit" color="warning" />
          </IconButton>
        </div>
      ) : (
        <div className={styles.buttons}>
          <IconButton size="small" onClick={setEdit}>
            <EditIcon fontSize="inherit" color="disabled" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default memo(EditableField);

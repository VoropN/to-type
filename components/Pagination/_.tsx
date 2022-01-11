import { memo } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { IPage } from '../TextToEnter/hooks/useActivePage';

export interface IPagination {
  activePage: number;
  pages: IPage[];
}

const Pagination = ({ activePage, pages }: IPagination) => {
  return (
    <div className={styles.pagination}>
      {pages.map(({ name, onSelect, pageId }) => (
        <div
          key={name}
          onClick={onSelect}
          className={classNames(styles.paginationItem, {
            [styles.paginationActiveItem]: pageId === activePage,
          })}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default memo(Pagination);

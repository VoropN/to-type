import { ChangeEvent, memo } from 'react';
import styles from './styles.module.scss';
import { IPage } from '../TextToEnter/hooks/useActivePage';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export interface IPagination {
  activePage: number;
  pages: IPage[];
}

const PaginationComponent = ({ activePage, pages }: IPagination) => {
  return (
    <div className={styles.container}>
      <Stack spacing={2}>
        <Pagination
          boundaryCount={2}
          siblingCount={3}
          color="standard"
          count={pages.length}
          page={activePage + 1}
          onChange={(event: ChangeEvent<any>, pageNumber) => {
            event.target.blur();
            pages[pageNumber - 1].onSelect();
          }}
        />
      </Stack>
    </div>
  );
};

export default memo(PaginationComponent);

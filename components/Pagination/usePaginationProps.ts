import { IPagination } from './index';
import { IPage } from '../TextToEnter/hooks/useActivePage';

export interface IUsePaginationProps {
  activePage: number;
  pages: IPage[];
}
export const usePaginationProps = ({
  activePage,
  pages,
}: IUsePaginationProps): IPagination => {
  return {
    activePage,
    pages,
  };
};

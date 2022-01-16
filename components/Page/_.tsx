import { memo, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

interface IPage {
  children: ReactNode;
}

const Page = ({ children }: IPage) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default memo(Page);

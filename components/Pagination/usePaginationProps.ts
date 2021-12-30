import {useState} from "react";
import {IPagination} from "./index";

export interface IUsePaginationProps {
  fullText: string;
  setText: (text: string) => void;
}
export const usePaginationProps = ({fullText, setText}: IUsePaginationProps): IPagination => {
  const [activePage, setActivePage] = useState(0);

  return {
    fullText, setText, activePage, setActivePage
  }
}

import {Dispatch, SetStateAction, useState} from "react";
import {IPagination} from "./index";

export interface IUsePaginationProps {
  fullText: string;
  setText: Dispatch<SetStateAction<string>>
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>
}
export const usePaginationProps = ({fullText, setText, activePage, setActivePage}: IUsePaginationProps): IPagination => {
  return {
    fullText, setText, activePage, setActivePage
  }
}

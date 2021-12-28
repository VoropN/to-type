import { useEffect, useMemo, useState } from "react";

export const debounce = (func: (...arg: any[]) => void, ms: number) => {
  let isCooldown = false;

  return (...arg: any[]) => {
    if (isCooldown) return;
    func.apply(null, arg);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}

const debounce1 = (func: (...arg: any[]) => void, delay: number) => {
  let timerId: NodeJS.Timeout;
  return (...arg: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(null, arg), delay);
  };
};

export const useFuncDebounce = ({ func, delay = 1000, deps = [] }: any) =>
  useMemo(() => debounce(func, delay), deps);

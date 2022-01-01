export const enterSymbol = '↵';
export const spaceSymbol = '_';
export const visibleSymbols = [enterSymbol];
export const getSymbol = (letter: string) => {
  if (/\r|\n|Enter/.test(letter)) return enterSymbol;
  if (/\s/.test(letter)) return spaceSymbol;
  if (/[`'’]/.test(letter)) return "'";
  if (/[-—]/g.test(letter)) return '-';
  if (/[….·]/.test(letter)) return '.';

  return letter;
};

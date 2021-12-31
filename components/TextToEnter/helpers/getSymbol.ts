export const visibleSymbols = ['↵'];
export const space = '_';
export const getSymbol = (letter: string) => {
  if (/\r|\n|Enter/.test(letter)) return '↵';
  if (/\s/.test(letter)) return space;
  if (/[`'’]/.test(letter)) return '\'';
  if (/[-—]/g.test(letter)) return '-';
  if (/[….·]/.test(letter)) return '.';

  return letter;
}

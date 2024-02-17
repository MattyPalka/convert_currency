import { tableASymbols } from "./table-a-symbols";
import { tableBSymbols } from "./table-b-symbols";

export const getTableType = (currencyCode: string): "a" | "b" | undefined => {
  const code = currencyCode.toUpperCase();
  if (tableASymbols.includes(code)) {
    return "a";
  }
  if (tableBSymbols.includes(code)) {
    return "b";
  }
  return undefined;
};

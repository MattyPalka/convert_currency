import { getTableType } from "./get-table-type";

export const getExchangeValue = async ({
  currencyName,
  exchangeDate,
  value,
}: {
  currencyName: string;
  exchangeDate: string;
  value: number;
}): Promise<{ result: number | undefined; error?: string }> => {
  const currencyCode = currencyName.toLowerCase();
  if (currencyCode === "pln") {
    return { result: value };
  }

  const table = getTableType(currencyCode);

  if (!table) {
    return { result: undefined, error: "Not supported currency code" };
  }

  const response = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/${exchangeDate}/?format=json`
  );

  if (response.ok) {
    const data = await response.json();
    if (data?.rates?.length) {
      const [{ mid }] = data.rates;
      return { result: +(value * mid).toFixed(2) };
    }
  } else {
    return { result: undefined, error: response.statusText };
  }
};

export const getExchangeValue = async ({
  currencyName,
  exchangeDate,
  value,
}: {
  currencyName: string;
  exchangeDate: string;
  value: number;
}): Promise<{ result: number | undefined }> => {
  // check if date is weekend or work with response status 404 / statusText: not fonud

  // check if currency name is correct

  const response = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currencyName.toLowerCase()}/${exchangeDate}/?format=json`
  );

  if (response.ok) {
    const data = await response.json();
    if (data?.rates?.length) {
      const [{ mid }] = data.rates;
      return { result: +(value * mid).toFixed(2) };
    }
  } else {
    // TODO HANDLE ERROR INFORM USER
    return { result: undefined };
  }
};

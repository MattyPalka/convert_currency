export const isCurrencyString = (
  currency:
    | {
        color: string;
        id: string;
        name?: string;
      }
    | string
    | null
): currency is string =>
  currency !== null &&
  (
    currency as {
      color: string;
      id: string;
      name?: string;
    }
  )?.name === undefined;

import type RecordType from "@airtable/blocks/dist/types/src/models/record";
import { useGlobalConfig } from "@airtable/blocks/ui";
import React from "react";
import { FieldId } from "../types";

interface Props {
  record: RecordType | null;
}

const getExchangeValue = async ({
  currencyName,
  exchangeDate,
  value,
}: {
  currencyName: string;
  exchangeDate: string;
  value: number;
}) => {
  // check if date is weekend or work with response status 404 / statusText: not fonud
  const response = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currencyName.toLowerCase()}/${exchangeDate}/?format=json`
  );

  const data = await response.json();

  console.log("or", data);
};

export const Record = ({ record }: Props) => {
  const globalConfig = useGlobalConfig();
  const exchangeDateFieldId = globalConfig.get(FieldId.ExchangeDate) as
    | string
    | null;
  const valueFieldId = globalConfig.get(FieldId.Value) as string | null;
  const currencyFieldId = globalConfig.get(FieldId.Currency) as string | null;
  const resultFieldId = globalConfig.get(FieldId.Result) as string | null;

  const exchangeDate = record.getCellValue(exchangeDateFieldId) as
    | string
    | null;
  const value = record.getCellValue(valueFieldId) as number | null;
  const currency = record.getCellValue(currencyFieldId) as {
    color: string;
    id: string;
    name: string;
  } | null;
  const result = record.getCellValue(resultFieldId) as number | null;

  if (!record) {
    return null;
  }

  if (!result && currency && value && exchangeDate) {
    getExchangeValue({ currencyName: currency.name, value, exchangeDate });
  }

  return (
    <li
      style={{
        listStyle: "none",
        display: "contents",
      }}
    >
      <span>{record.name}</span>
      <span>{exchangeDate}</span>
      <span style={{ textAlign: "end" }}>{value.toFixed(2)}</span>
      <span>{currency.name}</span>
      <span style={{ textAlign: "end" }}>{result?.toFixed(2)}</span>
    </li>
  );
};

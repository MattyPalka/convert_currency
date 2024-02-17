import type RecordType from "@airtable/blocks/dist/types/src/models/record";
import { useBase, useGlobalConfig } from "@airtable/blocks/ui";
import React, { useEffect } from "react";
import { FieldId, TableId } from "../types";
import { getExchangeValue } from "../utils/get-exchange-value";

interface Props {
  record: RecordType | null;
  darkBg?: boolean;
}

export const Record = ({ record, darkBg }: Props) => {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get(TableId.Main) as string | null;
  const table = base.getTableByIdIfExists(tableId);
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

  useEffect(() => {
    if (record && !result && currency && value && exchangeDate) {
      (async () => {
        const exchangedResult = await getExchangeValue({
          currencyName: currency?.name,
          value,
          exchangeDate,
        });

        if (exchangedResult.result) {
          table.updateRecordAsync(record, {
            [resultFieldId]: exchangedResult.result,
          });
        }
      })();
    }
  }, [result, currency, value, exchangeDate, record, table, resultFieldId]);

  if (!record) {
    return null;
  }

  return (
    <tr style={darkBg ? { backgroundColor: "lightgray" } : {}}>
      <td style={{ textAlign: "start" }}>{record?.name || "empty field"}</td>
      <td style={{ textAlign: "center" }}>{exchangeDate}</td>
      <td style={{ textAlign: "end" }}>{value?.toFixed(2)}</td>
      <td style={{ textAlign: "center" }}>{currency?.name}</td>
      <td style={{ textAlign: "end" }}>{result?.toFixed(2)} PLN</td>
    </tr>
  );
};

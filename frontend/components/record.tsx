import type RecordType from "@airtable/blocks/dist/types/src/models/record";
import { useBase, useGlobalConfig } from "@airtable/blocks/ui";
import React, { useCallback, useEffect, useState, memo } from "react";
import { FieldId, TableId } from "../types";
import { getExchangeValue } from "../utils/get-exchange-value";
import { isEqual } from "lodash-es";

interface Props {
  record: RecordType;
  exchangeDate: string | null;
  value: number | null;
  currency: {
    color: string;
    id: string;
    name: string;
  } | null;
  result: number | null;
  darkBg?: boolean;
}

const RecordComponent = ({
  record,
  darkBg,
  exchangeDate,
  value,
  currency,
  result,
}: Props) => {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const [error, setError] = useState<string | undefined>(undefined);
  const tableId = globalConfig.get(TableId.Main) as string | null;
  const table = base.getTableByIdIfExists(tableId);

  const resultFieldId = globalConfig.get(FieldId.Result) as string | null;

  const convert = useCallback(async () => {
    const exchangedResult = await getExchangeValue({
      currencyName: currency?.name,
      value,
      exchangeDate,
    });

    if (exchangedResult.result) {
      setError(undefined);

      table.updateRecordAsync(record, {
        [resultFieldId]: exchangedResult.result,
      });
    }

    if (exchangedResult.error) {
      setError(exchangedResult.error);
    }
  }, [currency, exchangeDate, record, resultFieldId, table, value]);

  useEffect(() => {
    if (!result && currency && value && exchangeDate) {
      convert();
    }
  }, [result, currency, value, exchangeDate, table, resultFieldId, convert]);

  const getStyle = () => {
    if (error) {
      return { backgroundColor: "red", color: "white" };
    }
    return darkBg ? { backgroundColor: "lightgray" } : {};
  };

  return (
    <tr style={getStyle()}>
      <td style={{ textAlign: "start" }}>{record?.name || "---"}</td>
      <td style={{ textAlign: "center" }}>{exchangeDate || "---"}</td>
      <td style={{ textAlign: "end" }}>{value?.toFixed(2) || "---"}</td>
      <td style={{ textAlign: "center" }}>{currency?.name || "---"}</td>
      <td style={{ textAlign: "end" }}>
        {error || `${result?.toFixed(2) || "---"} PLN`}
      </td>
    </tr>
  );
};

export const Record = memo(RecordComponent, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);

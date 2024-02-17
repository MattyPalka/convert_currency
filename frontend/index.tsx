import {
  initializeBlock,
  useBase,
  useGlobalConfig,
  useRecords,
} from "@airtable/blocks/ui";
import React from "react";
import { Selector } from "./selector";
import { Record } from "./components/record";
import { Info } from "./components/info";
import { FieldId } from "./types";

function App() {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get("selectedTableId") as string | null;

  const table = base.getTableByIdIfExists(tableId);

  const records = useRecords(table);
  const exchangeDateFieldId = globalConfig.get(FieldId.ExchangeDate) as
    | string
    | null;
  const valueFieldId = globalConfig.get(FieldId.Value) as string | null;
  const currencyFieldId = globalConfig.get(FieldId.Currency) as string | null;
  const resultFieldId = globalConfig.get(FieldId.Result) as string | null;

  const { hasPermission } = table.checkPermissionsForUpdateRecord();

  return (
    <main style={{ padding: "1rem", minWidth: "400px" }}>
      <Selector />

      <div
        style={{
          height: "1px",
          backgroundColor: "black",
          width: "100%",
          marginTop: "0.5rem",
        }}
      />
      <Info />
      {hasPermission ? (
        <section>
          <table
            style={{
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid black" }}>Name</th>
                <th style={{ borderBottom: "1px solid black" }}>Date</th>
                <th style={{ borderBottom: "1px solid black" }}>Value</th>
                <th style={{ borderBottom: "1px solid black" }}>Currency</th>
                <th style={{ borderBottom: "1px solid black" }}>
                  Exchanged to
                </th>
              </tr>
            </thead>

            <tbody>
              {records?.map((record, i) => {
                const exchangeDate = record.getCellValue(
                  exchangeDateFieldId
                ) as string | null;
                const value = record.getCellValue(valueFieldId) as
                  | number
                  | null;
                const currency = record.getCellValue(currencyFieldId) as {
                  color: string;
                  id: string;
                  name: string;
                } | null;
                const result = record.getCellValue(resultFieldId) as
                  | number
                  | null;
                return (
                  <Record
                    key={record.id}
                    record={record}
                    exchangeDate={exchangeDate}
                    value={value}
                    currency={currency}
                    result={result}
                    darkBg={!!(i % 2)}
                  />
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <section style={{ backgroundColor: "red", padding: "0.25rem 1rem" }}>
          <h3 style={{ color: "white" }}>
            You do not have permission to update records. Contact table
            administrator to update your permission
          </h3>
        </section>
      )}
    </main>
  );
}

initializeBlock(() => <App />);

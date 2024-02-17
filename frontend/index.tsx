import {
  FieldPickerSynced,
  TablePickerSynced,
  TextButton,
  expandRecord,
  initializeBlock,
  useBase,
  useGlobalConfig,
  useRecords,
} from "@airtable/blocks/ui";
import React from "react";

function App() {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get("selectedTableId") as string | null;
  const costDataFieldId = globalConfig.get("costDateFieldId") as string | null;
  const valueFieldId = globalConfig.get("valueFieldId") as string | null;
  const currencyFieldId = globalConfig.get("currencyFieldId") as string | null;
  const exchangedFieldId = globalConfig.get("exchangedFieldId") as
    | string
    | null;

  const table = base.getTableByIdIfExists(tableId);
  const records = useRecords(table);
  return (
    <div>
      <div>
        <TablePickerSynced globalConfigKey="selectedTableId" />
        <FieldPickerSynced table={table} globalConfigKey="costDateFieldId" />
        <FieldPickerSynced table={table} globalConfigKey="valueFieldId" />
        <FieldPickerSynced table={table} globalConfigKey="currencyFieldId" />
        <FieldPickerSynced table={table} globalConfigKey="exchangedFieldId" />
      </div>

      {records?.map((record) => (
        <div
          key={record.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            padding: 12,
            borderBottom: "1px solid #ddd",
          }}
        >
          {record.name}
          <TextButton
            icon="expand"
            aria-label="expand record"
            onClick={() => {
              expandRecord(record);
            }}
          />
        </div>
      ))}
    </div>
  );
}

initializeBlock(() => <App />);

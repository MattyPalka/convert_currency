import {
  TablePickerSynced,
  useBase,
  useGlobalConfig,
} from "@airtable/blocks/ui";
import React from "react";
import { FieldId, TableId } from "./types";
import { Picker } from "./components/picker";

export const Selector = () => {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get(TableId.Main) as string | null;

  const table = base.getTableByIdIfExists(tableId);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          gridColumn: "1 / 5",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <label style={{ fontWeight: 700 }}>Select table</label>
        <TablePickerSynced globalConfigKey={TableId.Main} />
      </div>
      {!!table && (
        <>
          <Picker
            label="Exchange date"
            fieldId={FieldId.ExchangeDate}
            table={table}
          />
          <Picker label="Value" fieldId={FieldId.Value} table={table} />
          <Picker label="Currency" fieldId={FieldId.Currency} table={table} />
          <Picker label="Result" fieldId={FieldId.Result} table={table} />
        </>
      )}
    </div>
  );
};

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
    <section
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <label style={{ fontWeight: 700 }}>Select table</label>
        <TablePickerSynced globalConfigKey={TableId.Main} />
      </div>
      {!!table && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "0.5rem",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Picker
            label="Exchange date"
            fieldId={FieldId.ExchangeDate}
            table={table}
          />
          <Picker label="Value" fieldId={FieldId.Value} table={table} />
          <Picker label="Currency" fieldId={FieldId.Currency} table={table} />
          <Picker
            label="Result column"
            fieldId={FieldId.Result}
            table={table}
          />
        </div>
      )}
    </section>
  );
};

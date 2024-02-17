import Table from "@airtable/blocks/dist/types/src/models/table";
import { FieldId } from "../types";
import { FieldPickerSynced } from "@airtable/blocks/ui";
import React from "react";
import { FieldType } from "@airtable/blocks/dist/types/src/types/field";

interface PickerProps {
  table: Table | null;
  fieldId: FieldId;
  label: string;
  allowedTypes: FieldType[];
}
export const Picker = ({
  table,
  fieldId,
  label,
  allowedTypes,
}: PickerProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <label
        style={{
          textTransform: "uppercase",
          fontWeight: 500,
          fontSize: "0.75rem",
        }}
      >
        {label}
      </label>
      <FieldPickerSynced
        table={table}
        globalConfigKey={fieldId}
        allowedTypes={allowedTypes}
      />
    </div>
  );
};

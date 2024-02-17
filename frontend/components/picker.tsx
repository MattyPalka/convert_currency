import Table from "@airtable/blocks/dist/types/src/models/table";
import { FieldId } from "../types";
import { FieldPickerSynced } from "@airtable/blocks/ui";
import React from "react";

interface PickerProps {
  table: Table | null;
  fieldId: FieldId;
  label: string;
}
export const Picker = ({ table, fieldId, label }: PickerProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label>{label}</label>
      <FieldPickerSynced table={table} globalConfigKey={fieldId} />
    </div>
  );
};

import {
  initializeBlock,
  useBase,
  useGlobalConfig,
  useRecords,
} from "@airtable/blocks/ui";
import React from "react";
import { Selector } from "./selector";
import { Record } from "./components/record";

function App() {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get("selectedTableId") as string | null;

  const table = base.getTableByIdIfExists(tableId);
  const records = useRecords(table);
  return (
    <div style={{ padding: "1rem" }}>
      <Selector />

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, auto)",
          gap: "0.5rem",
        }}
      >
        {records?.map((record) => (
          <Record key={record.id} record={record} />
        ))}
      </ul>
    </div>
  );
}

initializeBlock(() => <App />);

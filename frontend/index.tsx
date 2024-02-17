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
    <div style={{ padding: "1rem", minWidth: "400px" }}>
      <Selector />

      <div
        style={{
          height: "1px",
          backgroundColor: "black",
          width: "100%",
          margin: "0.5rem 0",
        }}
      />
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
            <th style={{ borderBottom: "1px solid black" }}>Exchanged to</th>
          </tr>
        </thead>

        <tbody>
          {records?.map((record, i) => (
            <Record key={record.id} record={record} darkBg={!!(i % 2)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

initializeBlock(() => <App />);

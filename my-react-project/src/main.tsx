import React from "react";
import ReactDOM from "react-dom/client";
import ParamEditor from "./ParamEditor.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ParamEditor
      model={{ paramValues: [] }}
      params={[
        { id: 1, name: "param1", type: "string" },
        { id: 2, name: "param2", type: "number" },
        { id: 3, name: "param3", type: "boolean" },
        { id: 4, name: "param4", type: "date" },
      ]}
    />
  </React.StrictMode>,
);

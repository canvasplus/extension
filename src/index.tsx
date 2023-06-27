import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Sidebar from "./sidebar/Sidebar";

const header =
  document.querySelector("#header") ?? document.createElement("div");

header.innerHTML = "";
header.className = "canvasplus-header";

document.body.appendChild(header);

const root = ReactDOM.createRoot(header);

root.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
);

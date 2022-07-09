import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App";
import "./index.css";


const dRoot = document.querySelector("#app");
// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file

// Be sure eleemebt exist before use it as a document root
if (dRoot) {
  const root = ReactDOMClient.createRoot(dRoot);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
};
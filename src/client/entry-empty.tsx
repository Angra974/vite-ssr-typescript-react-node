import React from "react";
import ReactDOMServer from "react-dom/server";

export function render(url: string) {
  return ReactDOMServer.renderToString(<></>);
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import { globalCss } from "no-stitches/runtime";

import App from "./App";

globalCss({
  body: {
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  code: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  process.env.NODE_ENV !== "production" ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);

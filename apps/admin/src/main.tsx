import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

// Start MSW in development
async function enableMocking() {
  if (import.meta.env.VITE_MOCKING_ENABLED) {
    const { worker } = await import("./services/msw/browser.ts");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});

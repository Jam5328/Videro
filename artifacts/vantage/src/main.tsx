import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

createRoot(document.getElementById("root")!).render(<App />);

// Initialise analytics after render — non-blocking, no-op if VITE_POSTHOG_KEY is absent
initAnalytics();

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHIBLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHIBLE_KEY) {
  throw new Error(
    "VITE_CLERK_PUBLISHABLE_KEY is not defined in the environment variables"
  );
}

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <ClerkProvider publishableKey={PUBLISHIBLE_KEY}>
      <App />
    </ClerkProvider>
  </AppContextProvider>
);

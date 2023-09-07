import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import { Analytics } from "@vercel/analytics/react";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Ada versi baharu dikemaskini. Update?")) {
      updateSW(true);
    }
  },
});

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
      <Analytics />
    </ChakraProvider>
  </React.StrictMode>
);

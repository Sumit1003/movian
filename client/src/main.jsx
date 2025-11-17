// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

import "./index.css";

// Create root only once
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* Global App */}
      <App />

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1F2937", // slate-800
            color: "white",
            borderRadius: "8px",
            fontSize: "15px",
          },
          success: {
            style: { background: "#10B981" },
          },
          error: {
            style: { background: "#EF4444" },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);

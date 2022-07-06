import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { IssueProvider } from "./context/IssueContext";
import { IssuesCounterProvider } from "./context/IssuesCounterContext";
import "./index.css";
import App from "./routes/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <IssuesCounterProvider>
        <IssueProvider>
          <App />
        </IssueProvider>
      </IssuesCounterProvider>
    </AuthProvider>
  </React.StrictMode>
);

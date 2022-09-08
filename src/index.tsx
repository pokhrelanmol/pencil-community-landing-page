import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PageContentProvider } from "./contexts/AppContext";
import "./index.css";
import { theme } from "./expand-theme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <PageContentProvider>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </PageContentProvider>
);

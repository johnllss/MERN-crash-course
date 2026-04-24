import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster />
    </Provider>
  </React.StrictMode>
);
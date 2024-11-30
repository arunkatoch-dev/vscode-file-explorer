import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MainAppContextProvider } from "./context/MainAppContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MainAppContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </MainAppContextProvider>
    </BrowserRouter>
  </StrictMode>
);

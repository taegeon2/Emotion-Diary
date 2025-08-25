import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* 브라우저의 현재 주소를 저장 및 감시하는 역할 */}
    <App />
  </BrowserRouter>
);

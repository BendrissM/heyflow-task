import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const jsonData = `{
"date": "2021-10-27T07:49:14.896Z",
"hasError": false,
"test": {
"id": "4c212130",
"prop": "iban",
"value": "DE81200505501265402568",
"hasError": false
},
"fields": [
{
"id": "4c212130",
"prop": "iban",
"value": "DE81200505501265402568",
"hasError": false
}
]
}`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App json={jsonData} />
  </StrictMode>
);

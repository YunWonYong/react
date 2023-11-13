import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement === null)  {
    throw new Error("element not found. id: root");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
    <App />
);

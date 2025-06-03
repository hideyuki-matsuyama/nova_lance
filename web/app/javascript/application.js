import "@hotwired/turbo-rails";
import "./controllers";

import React from "react";
import ReactDOM from "react-dom/client";
import ExamplesComponent from "./components/ExamplesComponent";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-examples-container");
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <ExamplesComponent />
      </React.StrictMode>
    );
  }
});

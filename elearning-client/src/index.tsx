import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          clientId:
          "ASPP8NjdSShWYfLqmWYATv2QgUSw3fV41I8tM_N3oeLlG6cdjVo27vSHnHFvmq7PNyk6IV_IXl2HDqxL",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </Provider>
  </BrowserRouter>
);

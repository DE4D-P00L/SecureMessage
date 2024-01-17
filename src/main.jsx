import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./features/store.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Auth0Provider
        domain={import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENTID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}>
        <App />
      </Auth0Provider>
    </Provider>
  </BrowserRouter>
);

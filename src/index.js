import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "./context/toastContext/ToastContext";
import { AuthProvider } from "./context/authContext/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

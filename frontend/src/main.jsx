import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; 
import App from "./App";
import "./styles/index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </>
    </AuthProvider>
  </React.StrictMode>
);
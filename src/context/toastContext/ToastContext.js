import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => (
  <ToastContext.Provider value={{ ToastContainer, toast }}>
    {children}
  </ToastContext.Provider>
);

export const useToastContext = () => useContext(ToastContext);

import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authSlice } from "./auth";
import { modalSlice } from "./shared";
import { alertaSlice } from "./alertas";
import { vehiculoSlice } from "./vehiculos";
import { adminSlice } from "./admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    alerta: alertaSlice.reducer,
    vehiculo: vehiculoSlice.reducer,
    admin: adminSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["modal/openModal"],
        ignoredPaths: ["modal.modalProps.ModalContent"],
      },
    }),
});

export const useUser = () => useSelector((state) => state.auth);
export const useModal = () => useSelector((state) => state.modal);
export const useAlertaStore = () => useSelector((state) => state.alerta);
export const usevehiculoStore = () => useSelector((state) => state.vehiculo);
export const useAdminStore = () => useSelector((state) => state.admin);

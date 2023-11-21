import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  alertaCreada: false,
};

export const alertaSlice = createSlice({
  name: "alerta",
  initialState,
  reducers: {
    alertaList: (state, action) => {
      state.data = action.payload;
    },
    alertaCreada: (state) => {
      state.alertaCreada = true;
    },
    alertaReset: (state) => {
      state.alertaCreada = false;
    },
  },
});

export const { alertaList, alertaCreada, alertaReset } =
  alertaSlice.actions;

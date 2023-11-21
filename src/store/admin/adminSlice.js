import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  alertaAdminCreada: false,
  domicilioAdminCreado: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    alertaAdminList: (state, action) => {
      state.data = action.payload;
    },
    alertaAdminCreada: (state) => {
      state.alertaAdminCreada = true;
    },
    alertaAdminReset: (state) => {
      state.alertaAdminCreada = false;
    },
    domicilioAdminList: (state, action) => {
      state.data = action.payload;
    },
    domicilioAdminCreado: (state) => {
      state.domicilioAdminCreado = true;
    },
    domicilioAdminReset: (state) => {
      state.domicilioAdminCreado = false;
    },
  },
});

export const {
  alertaAdminList,
  alertaAdminCreada,
  alertaAdminReset,
  domicilioAdminList,
  domicilioAdminCreado,
  domicilioAdminReset,
} = adminSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { AUTH_TYPES } from "./utils/enum";

const initialState = {
  token: null,
  email: null,
  name: null,
  lastName: null,
  role: null,
  address: null,
  status: AUTH_TYPES.GUEST,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.token = payload.token;
      state.email = payload.Email;
      state.name = payload.Nombre;
      state.lastName = payload.Apellido;
      state.role = payload.Rol;
      state.address = payload.DomicilioId;
      state.status = AUTH_TYPES.REGISTERED;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.lastName = null;
      state.role = null;
      state.address = null;
      state.status = AUTH_TYPES.GUEST;
    },
    checkingCredentials: (state) => {
      state.status = AUTH_TYPES.CHECKING;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  vehiculoCreado: false,
};

export const vehiculoSlice = createSlice({
  name: "vehiculo",
  initialState,
  reducers: {
    vehiculoList: (state, action) => {
      state.data = action.payload;
    },
    vehiculoCreado: (state) => {
      state.vehiculoCreado = true;
    },
    vehiculoReset: (state) => {
      state.vehiculoCreado = false;
    },
  },
});

export const { vehiculoList, vehiculoCreado, vehiculoReset } =
  vehiculoSlice.actions;

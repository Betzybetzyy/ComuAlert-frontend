import { Route, Routes } from "react-router-dom";
import {
  Login,
  Logout,
  Alertas,
  Vehiculos,
  AsociarDomicilio,
  Patentes,
  Register,
  Domicilio,
  Visitas
} from "../components";
import { ProtectedRoute } from "./protected-route";
import { GestionAlertas, GestionDomicilios } from "../components/admin";

export const AppRouter = () => {
  const user = ["USER"];
  const admin = ["ADMIN"];

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/asociar" element={<AsociarDomicilio />} />
      <Route path="/logout" element={<Logout />} />
      <Route element={<ProtectedRoute allowedRoles={[...user, ...admin]} />}>
        <Route path="/dashboard" element={<Alertas />} />
        <Route path="/domicilio" element={<Domicilio />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/patentes" element={<Patentes />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={[...admin]} />}>
        <Route path="/admin/domicilios" element={<GestionDomicilios />} />
        <Route path="/admin/alertas" element={<GestionAlertas />} />
      </Route>
    </Routes>
  );
};

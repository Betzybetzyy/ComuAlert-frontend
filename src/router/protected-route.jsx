import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUser } from "../store";
import { AUTH_TYPES } from "../store/auth/utils/enum";
import { Layout } from "../components/ui/Layout/layout";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { status, role, DomicilioId } = useUser();
  const location = useLocation();

  if (DomicilioId === null && status !== AUTH_TYPES.GUEST) {
    return <Navigate to="/asociar" state={{ from: location }} replace />;
  }

  return allowedRoles.includes(role) ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : status === AUTH_TYPES.GUEST ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import { obtenerAlertasAdmin } from "../../../../services/queries";
import { aprobarAlerta, rechazarAlerta } from "../../../../services/mutations";

export const useAlertasAdmin = () => {
  return useQuery("getUserAlerts", () => obtenerAlertasAdmin());
};

export const useRechazarAlertas = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => rechazarAlerta(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("rechazarAlerta");
    },
  });
};

export const useAprobarAlertas = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => aprobarAlerta(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("aprobarAlerta");
    },
  });
};


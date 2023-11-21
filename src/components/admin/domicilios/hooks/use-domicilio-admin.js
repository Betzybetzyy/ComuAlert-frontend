import { useMutation, useQuery, useQueryClient } from "react-query";
import { obtenerPeticionesDomicilioAdmin } from "../../../../services/queries";
import { aprobarSolicitud, rechazarSolicitud } from "../../../../services/mutations";

export const useDomicilioAdmin = () => {
  return useQuery("getUserAlerts", () => obtenerPeticionesDomicilioAdmin());
};

export const useRechazarSolicitud = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => rechazarSolicitud(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("rechazarSolicitud");
    },
  });
};

export const useAprobarSolicitud = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => aprobarSolicitud(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("aprobarSolicitud");
    },
  });
};


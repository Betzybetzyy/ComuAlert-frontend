import { useMutation, useQuery, useQueryClient } from "react-query";
import { obtenerPatente } from "../../../services/mutations";
import { obtenerVehiculoPatente } from "../../../services/queries";

export const usePatenteArchivo = () => {
  const queryClient = useQueryClient();

  return useMutation((file) => obtenerPatente(file), {
    onSuccess: () => {
      queryClient.invalidateQueries("obtenerPatente");
    },
  });
};


export const useObtenerVehiculoPatente = (patente) => {
  return useQuery("obtenerVehiculoPatente", () => obtenerVehiculoPatente(patente), 
  {
    enabled: false,
    retry: false,
  });
};

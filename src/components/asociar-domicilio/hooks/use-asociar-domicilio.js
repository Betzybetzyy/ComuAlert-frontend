import { useMutation, useQuery, useQueryClient } from "react-query";
import { obtenerDomicilios, obtenerPeticiones } from "../../../services/queries";
import { asociarDomicilio, crearDomicilio } from "../../../services/mutations";

export const useObtenerDomicilios = () => {
  return useQuery("getDomicilios", () => obtenerDomicilios());
};

export const useCrearDomicilio = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => crearDomicilio(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("crearDomicilio");
    },
  });
};

export const useAsociarDomicilio = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => asociarDomicilio(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("asociarDomicilio");
    },
  });
};

export const useObtenerPeticionAsociacion = () => {
  return useQuery("getPeticionAsociacion", () => obtenerPeticiones());
};


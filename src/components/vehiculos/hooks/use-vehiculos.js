import { useMutation, useQuery, useQueryClient } from "react-query";
import { crearVehiculo, editarVehiculo, eliminarVehiculo } from "../../../services/mutations";
import { obtenerVehiculos } from "../../../services/queries";

export const useVehiculos = () => {
  return useQuery("getVehiculos", () => obtenerVehiculos());
};

export const useCrearVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => crearVehiculo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("crearVehiculo");
    },
  });
};

export const useEditarVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) => {
      return editarVehiculo(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("editarVehiculo");
      },
    }
  );
};

export const useEliminarVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => {
      return eliminarVehiculo(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("eliminarVehiculo");
      },
    }
  );
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import { obtenerAlertasUsuario } from "../../../services/queries";
import { crearAlerta, editarAlerta } from  '../../../services/mutations';

export const useAlertasUsuario = () => {
  return useQuery("getUserAlerts", () => obtenerAlertasUsuario());
};

export const useCrearAlertas = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => crearAlerta(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("crearAlerta");
    },
  });
};

export const useEditarAlerta = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) => {
      return editarAlerta(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("editarAlerta");
      },
    }
  );
};



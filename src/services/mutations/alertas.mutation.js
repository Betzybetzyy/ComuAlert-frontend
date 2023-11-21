import { client, enviroment } from "../../config";

const { ALERTAS_URL } = enviroment;
export const crearAlerta = async (data) => {
  const response = await client.post(ALERTAS_URL, data);
  return response?.data?.data;
};

export const editarAlerta = async (data) => {
  const { id, ...alerta } = data;
  const response = await client.put(`${ALERTAS_URL}/${id}`, alerta);
  return response?.data?.data;
};

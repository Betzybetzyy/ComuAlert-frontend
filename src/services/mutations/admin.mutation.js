import { client, enviroment } from "../../config";

const { DOMICILIO_URL, ALERTAS_URL } = enviroment;
export const rechazarSolicitud = async (data) => {
  const { Id, Resolucion } = data;
  const response = await client.put(`${DOMICILIO_URL}/rechazar/${Id}`, {
    Resolucion,
  });
  return response?.data?.data;
};

export const aprobarSolicitud = async (data) => {
  const response = await client.put(`${DOMICILIO_URL}/aprobar/${data.Id}`);
  return response?.data?.data;
};

export const rechazarAlerta= async (data) => {
  const { id, Resolucion } = data;
  const response = await client.put(`${ALERTAS_URL}/rechazar/${id}`, {
    Resolucion,
  });
  return response?.data?.data;
};

export const aprobarAlerta= async (data) => {
  const response = await client.put(`${ALERTAS_URL}/aprobar/${data.id}`);
  return response?.data?.data;
};


import { client, enviroment } from "../../config";

const { DOMICILIO_URL } = enviroment;
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

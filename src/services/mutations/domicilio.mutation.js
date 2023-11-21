import { client, enviroment } from "../../config";

const { DOMICILIO_URL } = enviroment;

export const crearDomicilio = async (data) => {
  const response = await client.post(DOMICILIO_URL, data);
  return response?.data?.data;
};

export const asociarDomicilio = async (data) => {
  const response = await client.post(`${DOMICILIO_URL}/asociar`, data);
  return response?.data?.data;
};

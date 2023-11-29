import { client, enviroment } from "../../config";

const { DOMICILIO_URL, ALERTAS_URL } = enviroment;

export async function obtenerPeticionesDomicilioAdmin() {
  const response = await client.get(`${DOMICILIO_URL}/peticiones`);
  return Promise.resolve(response?.data?.data);
}

export async function obtenerAlertasAdmin() {
  const response = await client.get(`${ALERTAS_URL}`);
  return Promise.resolve(response?.data?.data);
}


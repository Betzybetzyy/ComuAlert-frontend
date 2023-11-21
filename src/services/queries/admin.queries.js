import { client, enviroment } from "../../config";

const { DOMICILIO_URL } = enviroment;

export async function obtenerPeticionesDomicilioAdmin() {
  const response = await client.get(`${DOMICILIO_URL}/peticiones`);
  return Promise.resolve(response?.data?.data);
}

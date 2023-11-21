import { client, enviroment } from "../../config";

const { ALERTAS_URL } = enviroment;

export async function obtenerAlertasUsuario() {
  const response = await client.get(`${ALERTAS_URL}`);
  return Promise.resolve(response?.data?.data);
}

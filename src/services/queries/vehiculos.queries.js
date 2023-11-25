import { client, enviroment } from "../../config";

const { VEHICULOS_URL } = enviroment;

export async function obtenerVehiculos() {
  const response = await client.get(`${VEHICULOS_URL}`);
  return Promise.resolve(response?.data?.data);
}

export async function obtenerVehiculoPatente(data) {
  const response = await client.get(`${VEHICULOS_URL}/patente/${data}`);
  return Promise.resolve(response?.data?.data);
}

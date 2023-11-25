import { client, enviroment } from "../../config";

const { DOMICILIO_URL } = enviroment;

export async function obtenerDomicilios() {
  const response = await client.get(`${DOMICILIO_URL}`);
  return Promise.resolve(response?.data?.data);
}

export async function obtenerPeticiones() {
  const response = await client.get(`${DOMICILIO_URL}/asociar/peticion`);
  console.log(response);
  return Promise.resolve(response?.data?.data);
}

export async function obtenerDomicilio(id) {
  const response = await client.get(`${DOMICILIO_URL}/${id}`);
  return Promise.resolve(response?.data?.data);
}

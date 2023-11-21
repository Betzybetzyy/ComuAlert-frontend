import { client, enviroment } from "../../config";

const { VEHICULOS_URL, PATENTES_URL } = enviroment;
export const crearVehiculo = async (data) => {
  const response = await client.post(VEHICULOS_URL, data);
  return response?.data?.data;
};

export const editarVehiculo = async (data) => {
  const { id, ...vehiculo } = data;
  const response = await client.put(`${VEHICULOS_URL}/${id}`, vehiculo);
  return response?.data?.data;
};

export const eliminarVehiculo = async (id) => {
  const response = await client.delete(`${VEHICULOS_URL}/${id}`);
  return response?.data?.data;
};

export const obtenerPatente = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await client.post(`${PATENTES_URL}/lector`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data?.data;
};

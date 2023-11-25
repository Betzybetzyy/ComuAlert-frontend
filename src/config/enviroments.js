const { VITE_API_URL: baseURL } = import.meta.env;

const getEndpoints = (baseURL) => {
  return {
    LOGIN_URL: `${baseURL}/auth`,
    REGISTER_URL: `${baseURL}/usuarios`,
    SALES_URL: `${baseURL}/sales`,
    ALERTAS_URL: `${baseURL}/alerta`,
    VEHICULOS_URL: `${baseURL}/vehiculo`,
    DOMICILIO_URL: `${baseURL}/domicilio`,
    PATENTES_URL: `${baseURL}/patentes`,
  };
};

const ENDPOINTS = getEndpoints(baseURL);

export const enviroment = {
  ...ENDPOINTS,
};

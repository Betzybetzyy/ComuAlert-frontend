const { VITE_API_URL: baseURL } = import.meta.env;

const getEndpoints = (baseURL) => {
  return {
    LOGIN_URL: `${baseURL}/auth`,
    SALES_URL: `${baseURL}/sales`,
    ALERTAS_URL: `${baseURL}/alerta`,
    VEHICULOS_URL: `${baseURL}/vehiculo`,
    DOMICILIO_URL: `${baseURL}/domicilio`,
    PATENTES_URL: `${baseURL}/patentes`,


    PRODUCTS_SEARCH_URL: (search) => `${baseURL}/products/search/${search}`,
    USERS_URL: `${baseURL}/users`,
    USERS_SEARCH_URL: (search) => `${baseURL}/users/search/${search}`,
  };
};

const ENDPOINTS = getEndpoints(baseURL);

export const enviroment = {
  ...ENDPOINTS,
};

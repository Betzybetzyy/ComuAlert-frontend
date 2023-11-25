import { useQuery } from "react-query";
import { obtenerDomicilio } from "../../../services/queries";

export const useDomicilio = (id) => {
  return useQuery("getDomicilio", () => obtenerDomicilio(id));
};

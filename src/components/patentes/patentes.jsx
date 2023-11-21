import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  LoadingSpinner,
  UncontrolledSelect as Select,
} from "../ui/shared";
import { BusquedaFoto } from "./components/busqueda-foto";
import { BusquedaImagen } from "./components/busqueda-imagen";
import { BusquedaTexto } from "./components/busqueda-texto";
import { useObtenerVehiculoPatente } from "./hooks/use-patente";

const BUSQUEDAS = {
  foto: 1,
  imagen: 2,
  texto: 3,
};

const OPCIONES = [
  { value: BUSQUEDAS.foto, label: "Buscar por fotografía/cámara" },
  { value: BUSQUEDAS.imagen, label: "Buscar por imágen" },
  { value: BUSQUEDAS.texto, label: "Buscar por texto" },
];

export const Patentes = () => {
  const [busqueda, setBusqueda] = useState(1);
  const [patente, setPatente] = useState("");
  const { data, refetch, error, isRefetching, isLoading } =
    useObtenerVehiculoPatente(patente);

  useEffect(() => {
    if (patente) {
      refetch();
    }
  }, [patente]);

  const handleChange = (e) => {
    setBusqueda(+e.target.value);
  };

  return (
    <Container title="Búsqueda por patente" className="flex flex-col">
      <div className="w-full flex flex-row justify-between mb-4">
        <div className="w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <div className="mb-10 text-left">
              <Select
                name="patentes"
                label="Patentes"
                required
                variant="primary-search"
                options={OPCIONES}
                onChange={handleChange}
                defaultValue={OPCIONES[0]}
              />
            </div>
            {busqueda === BUSQUEDAS.foto ? (
              <BusquedaFoto setPatente={setPatente} />
            ) : busqueda === BUSQUEDAS.imagen ? (
              <BusquedaImagen setPatente={setPatente} />
            ) : (
              <BusquedaTexto setPatente={setPatente} />
            )}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center p-4 bg-white shadow rounded-lg">
          {isLoading || isRefetching ? (
            <LoadingSpinner variant="default" />
          ) : patente ? (
            data && !error ? (
              <div className="text-lg font-semibold">
                El auto con patente{" "}
                <span className="text-slate-600">{patente}</span> es
                <span
                  className={`text-${
                    data.EsVisita ? "green-600" : "amber-700"
                  }`}
                >
                  {` ${data.EsVisita ? "visita" : "residente"}`}
                </span>
              </div>
            ) : (
              <div className="text-lg font-semibold">
                No se encontraron resultados para la patente{" "}
                <span className="text-red-600">{patente}</span>
              </div>
            )
          ) : (
            <div className="text-lg font-semibold">
              No hay patente para mostrar.
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

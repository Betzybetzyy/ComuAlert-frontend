import React from "react";
import { Container, LoadingSpinner } from "../ui/shared";
import { dateFormat } from "../../utils/utils";
import { useDomicilio } from "./hooks/use-domicilio";
import { useUser } from "../../store";

export const Domicilio = () => {
  const { address } = useUser();
  const { data: domicilio, isLoading, error } = useDomicilio(address);

  return (
    <Container title="Domicilio" className="flex flex-col sm:flex-row">
      <div className="w-full p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Información del Domicilio
        </h3>
        {isLoading ? (
          <LoadingSpinner variant="default" />
        ) : (
          <div>
            <p>
              <strong>Dirección:</strong> {domicilio?.Direccion}
            </p>
            <p>
              <strong>Comuna:</strong> {domicilio?.Comuna}
            </p>
            <p>
              <strong>Condominio:</strong> {domicilio?.Condominio}
            </p>
            <p>
              <strong>Fecha Creación:</strong>{" "}
              {dateFormat(domicilio.FechaCreacion)}
            </p>
            <p>
              <strong>Fecha Edición:</strong>{" "}
              {dateFormat(domicilio.FechaEdicion)}
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

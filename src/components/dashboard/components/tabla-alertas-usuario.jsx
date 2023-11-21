import React from "react";
import {
  Alert,
  Badge,
  Button,
  LoadingSpinner,
  TD,
  TR,
  Table,
} from "../../ui/shared";
import { useAlertaStore } from "../../../store";
import { dateFormat } from "../../../utils/utils";

const tableTitles = [
  "#",
  "Motivo",
  "Descripcion",
  "Prioridad",
  "Fecha de creación",
  "Resolución",
  "Fecha de actualización",
  "Estado",
  "Editar",
];

export const TablaAlertasUsuario = ({ handleOpenEditModal }) => {
  const alertaStore = useAlertaStore((state) => state.alerta);

  const estadoStyle = {
    APROBADA: "success",
    RECHAZADA: "danger",
    PENDIENTE: "warning",
  };

  if (!alertaStore || !alertaStore.data) {
    return <LoadingSpinner variant="default" />;
  }

  const alertas = alertaStore.data;

  return (
    <div className="flex flex-col overflow-x-auto">
      {alertas?.length > 0 ? (
        <Table titles={tableTitles}>
          {alertas?.map((alerta, index) => (
            <TR key={alerta.id}>
              <TD className="text-center">{index + 1}</TD>
              <TD className="text-left">{alerta.Motivo}</TD>
              <TD className="text-left max-w-xs overflow-hidden">
                {alerta.Descripcion}
              </TD>
              <TD className="text-center">{alerta.Prioridad}</TD>
              <TD className="text-left whitespace-nowrap">
                {dateFormat(alerta.FechaCreacion)}
              </TD>
              <TD className="text-left">{alerta.Resolucion}</TD>
              <TD className="text-left whitespace-nowrap">
                {dateFormat(alerta.FechaEdicion)}
              </TD>
              <TD className="text-center">
                <Badge
                  label={alerta.Estado}
                  variant={estadoStyle[alerta.Estado]}
                />
              </TD>
              <TD>
                <Button
                  variant="link-danger"
                  onClick={() => handleOpenEditModal(alerta)}
                  className="text-xs sm:text-base"
                >
                  ✍
                </Button>
              </TD>
            </TR>
          ))}
        </Table>
      ) : (
        <Alert
          variant={"success"}
          text={"No hay alertas creadas."}
          icon={"CheckIcon"}
        />
      )}
    </div>
  );
};

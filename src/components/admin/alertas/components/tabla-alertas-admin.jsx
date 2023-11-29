import React from "react";
import {
  Alert,
  Badge,
  Button,
  LoadingSpinner,
  TD,
  TR,
  Table,
} from "../../../ui/shared";
import { dateFormat } from "../../../../utils/utils";
import { alertaAdminCreada, useAdminStore } from "../../../../store";
import { useAprobarAlertas } from "../hooks/use-alertas-admin";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const tableTitles = [
  "#",
  "Usuario",
  "Direccion",
  "Motivo",
  "Descripcion",
  "Prioridad",
  "Fecha de creación",
  "Estado",
  "Resolución",
  "Fecha de actualización",
  "Aprobar",
  "Rechazar",
];

export const TablaAlertasAdmin = ({ handleOpenEditModal }) => {
  const dispatch = useDispatch();
  const admin = useAdminStore((state) => state.admin);
  const { mutateAsync: aprobaralertaMutation } = useAprobarAlertas();

  const estadoStyle = {
    APROBADA: "success",
    RECHAZADA: "danger",
    PENDIENTE: "warning",
  };

  if (!admin || !admin.data) {
    return <LoadingSpinner variant="default" />;
  }

  const handleAprobar = async (data) => {
    try {
      await aprobaralertaMutation(data);
      toast.success("alerta aprobada correctamente");
      dispatch(alertaAdminCreada());
    } catch ({ response: { data } }) {
      toast.error(data.message || "Error! Contacte al administrador");
    }
  };

  const alertas = admin.data;

  return (
    <div className="flex flex-col overflow-x-auto">
      {alertas?.length > 0 ? (
        <Table titles={tableTitles}>
          {alertas?.map((alerta, index) => (
            <TR key={alerta.id || index}>
              <TD className="text-center">{index + 1}</TD>
              <TD className="text-left">{`${alerta?.Usuario?.Nombre} ${alerta?.Usuario?.Apellido}`}</TD>
              <TD className="text-left max-w-xs">
                {alerta?.Usuario.DomicilioUsuario?.Direccion}
              </TD>
              <TD className="text-left">{alerta.Motivo}</TD>
              <TD className="text-left max-w-xs overflow-hidden">
                {alerta.Descripcion}
              </TD>
              <TD className="text-left">{alerta.Prioridad}</TD>
              <TD className="text-left">
                {dateFormat(alerta.FechaCreacion)}
              </TD>
              <TD className="text-center">
                <Badge
                  label={alerta.Estado}
                  variant={estadoStyle[alerta.Estado]}
                />
              </TD>
              <TD className="text-left">{alerta.Resolucion}</TD>
              <TD className="text-left">
                {alerta.FechaEdicion ? dateFormat(alerta.FechaEdicion) : ""}
              </TD>
              <TD>
                <Button
                  variant="link-success"
                  onClick={() => handleAprobar(alerta)}
                >
                  ✔Aprobar
                </Button>
              </TD>
              <TD>
                <Button
                  variant="link-danger"
                  onClick={() => handleOpenEditModal(alerta, "reject")}
                >
                  ❌Rechazar
                </Button>
              </TD>
            </TR>
          ))}
        </Table>
      ) : (
        <Alert
          variant={"success"}
          text={"No hay alertas."}
          icon={"CheckIcon"}
        />
      )}
    </div>
  );
};

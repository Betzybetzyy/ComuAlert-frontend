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
import { domicilioAdminCreado, useAdminStore } from "../../../../store";
import { useAprobarSolicitud } from "../hooks/use-domicilio-admin";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const tableTitles = [
  "#",
  "Usuario",
  "Domicilio",
  "Fecha de creación",
  "Estado",
  "Resolución",
  "Rechazar",
  "Aprobar",
];

export const TablaDomiciliosAdmin = ({ handleOpenEditModal }) => {
  const dispatch = useDispatch();
  const admin = useAdminStore((state) => state.admin);
  const { mutateAsync: aprobarSolicitudMutation } = useAprobarSolicitud();

  const estadoStyle = {
    APROBADO: "success",
    RECHAZADO: "danger",
    PENDIENTE: "warning",
  };

  if (!admin || !admin.data) {
    return <LoadingSpinner variant="default" />;
  }

  const handleAprobar = async (data) => {
    try {
      await aprobarSolicitudMutation(data);
      toast.success("Solicitud aprobada correctamente");
      dispatch(domicilioAdminCreado());
    } catch (error) {
      console.log(error);
    }
  };

  const solicitudes = admin.data;

  return (
    <div className="flex flex-col overflow-x-auto">
      {solicitudes?.length > 0 ? (
        <Table titles={tableTitles}>
          {solicitudes?.map((solicitud, index) => (
            <TR key={solicitud.id}>
              <TD className="text-center">{index + 1}</TD>
              <TD className="text-left">{`${solicitud?.Usuario?.Nombre} ${solicitud?.Usuario?.Apellido}`}</TD>
              <TD className="text-left max-w-xs">
                {solicitud?.Domicilio?.Direccion}
              </TD>
              <TD className="text-left whitespace-nowrap">
                {dateFormat(solicitud.FechaCreacion)}
              </TD>
              <TD className="text-center">
                <Badge
                  label={solicitud.Estado}
                  variant={estadoStyle[solicitud.Estado]}
                />
              </TD>
              <TD className="text-left max-w-xs overflow-hidden">
                {solicitud.Resolucion}
              </TD>
              <TD>
                <Button
                  variant="link-danger"
                  onClick={() => handleOpenEditModal(solicitud, "reject")}
                >
                  ❌Rechazar
                </Button>
              </TD>
              <TD>
                <Button
                  variant="link-success"
                  onClick={() => handleAprobar(solicitud)}
                >
                  ✔Aprobar
                </Button>
              </TD>
            </TR>
          ))}
        </Table>
      ) : (
        <Alert
          variant={"success"}
          text={"No hay solicitudes."}
          icon={"CheckIcon"}
        />
      )}
    </div>
  );
};

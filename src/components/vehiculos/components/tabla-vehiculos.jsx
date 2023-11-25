import React, { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  LoadingSpinner,
  TD,
  TR,
  Table,
} from "../../ui/shared";
import { usevehiculoStore, vehiculoCreado } from "../../../store";
import { useEliminarVehiculo } from "../hooks/use-vehiculos";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const tableTitles = [
  "#",
  "Patente",
  "Marca",
  "Modelo",
  "Año",
  "Color",
  "Visita",
  "Editar",
  "Eliminar",
];

export const TablaVehiculos = ({ handleOpenEditModal }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const vehiculoStore = usevehiculoStore((state) => state.vehiculo);

  const { mutateAsync: eliminarVehiculoMutation } = useEliminarVehiculo();

  if (!vehiculoStore || !vehiculoStore.data) {
    return <LoadingSpinner variant="default" />;
  }

  const handleDeleteVehiculo = async (id) => {
    try {
      setLoading(true);
      await eliminarVehiculoMutation(id);
      dispatch(vehiculoCreado());
      setLoading(false);
      toast.success("Vehiculo eliminado exitosamente");
    } catch ({response: {data}}) {
      toast.error(data.message || "Error! Contacte al administrador")
    }
  };

  const vehiculos = vehiculoStore.data;

  return (
    <div className="flex flex-col overflow-x-auto">
      {loading ? (
        <LoadingSpinner variant="default" />
      ) : vehiculos?.length > 0 ? (
        <Table titles={tableTitles}>
          {vehiculos?.map((vehiculo, index) => (
            <TR key={vehiculo.id}>
              <TD className="text-center">{index + 1}</TD>
              <TD className="text-left">{vehiculo.Patente}</TD>
              <TD className="text-left">{vehiculo.Marca}</TD>
              <TD className="text-left">{vehiculo.Modelo}</TD>
              <TD className="text-left">{vehiculo.Ano}</TD>
              <TD className="text-left">{vehiculo.Color}</TD>
              <TD className="text-center">{vehiculo.EsVisita ? "✔" : ""}</TD>
              <TD>
                <Button
                  variant="link-danger"
                  onClick={() => handleOpenEditModal(vehiculo)}
                  className="text-xs sm:text-base"
                >
                  ✍
                </Button>
              </TD>
              <TD>
                <Button
                  variant="link-danger"
                  onClick={() => handleDeleteVehiculo(vehiculo.id)}
                  className="text-xs sm:text-base"
                >
                  🗑
                </Button>
              </TD>
            </TR>
          ))}
        </Table>
      ) : (
        <Alert
          variant={"success"}
          text={"No hay vehiculos creadas."}
          icon={"CheckIcon"}
        />
      )}
    </div>
  );
};

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, modalTypesKeys } from "../ui/shared";
import { EditarVehiculo, CrearVehiculo, TablaVehiculos } from "./components";
import {
  openModal,
  usevehiculoStore,
  vehiculoList,
  vehiculoReset,
} from "../../store";
import { useVehiculos } from "./hooks/use-vehiculos";

export const Vehiculos = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useVehiculos();
  const { vehiculoCreado } = usevehiculoStore((state) => state.vehiculo);

  useEffect(() => {
    dispatch(vehiculoList(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (vehiculoCreado) {
      refetch();
      dispatch(vehiculoReset());
    }
  }, [vehiculoCreado, dispatch]);

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.crearVehiculo,
        modalProps: {
          title: "Crear Vehículo",
          size: "s",
        },
        ModalContent: CrearVehiculo,
      })
    );
  };

  const handleOpenEditModal = (vehiculo) => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.editarVehiculo,
        modalProps: {
          title: "Editar Vehículo",
          size: "s",
          data: vehiculo,
        },
        ModalContent: EditarVehiculo,
      })
    );
  };

  return (
    <Container title="Vehiculos" className="flex flex-col sm:flex-row">
      <div className="pb-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
        <div className="w-full sm:w-auto self-center">
          <Button onClick={handleOpenModal} variant="primary" fullWidth>
            Agregar Vehiculo
          </Button>
        </div>
      </div>
      <TablaVehiculos handleOpenEditModal={handleOpenEditModal} />
    </Container>
  );
};

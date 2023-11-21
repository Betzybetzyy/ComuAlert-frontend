import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, modalTypesKeys } from "../ui/shared";
import { TablaAlertasUsuario, CrearAlerta, EditarAlerta } from "./components";
import {
  alertaList,
  alertaReset,
  openModal,
  useAlertaStore,
} from "../../store";
import { useAlertasUsuario } from "./hooks/use-alertas";

export const Alertas = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useAlertasUsuario();
  const { alertaCreada } = useAlertaStore((state) => state.alerta);

  useEffect(() => {
    dispatch(alertaList(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (alertaCreada) {
      refetch();
      dispatch(alertaReset());
    }
  }, [alertaCreada, dispatch]);

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.crearAlerta,
        modalProps: {
          title: "Crear Alerta",
          size: "s",
        },
        ModalContent: CrearAlerta,
      })
    );
  };

  const handleOpenEditModal = (alerta) => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.editarAlerta,
        modalProps: {
          title: "Editar Alerta",
          size: "s",
          data: alerta,
        },
        ModalContent: EditarAlerta,
      })
    );
  };

  return (
    <Container title="Alertas" className="flex flex-col sm:flex-row">
      <div className="pb-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
        <div className="w-full sm:w-auto self-center">
          <Button onClick={handleOpenModal} variant="primary" fullWidth>
            Agregar Alerta
          </Button>
        </div>
      </div>
      <TablaAlertasUsuario handleOpenEditModal={handleOpenEditModal} />
    </Container>
  );
};

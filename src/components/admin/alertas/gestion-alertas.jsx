import React from "react";
import { Container, modalTypesKeys } from "../../ui/shared";
import { useDispatch } from "react-redux";
import { useAlertasAdmin } from "./hooks/use-alertas-admin";
import { alertaAdminList, alertaAdminReset, openModal, useAdminStore } from "../../../store";
import { GestionModal } from "./components/gestion-modal";
import { TablaAlertasAdmin } from "./components/tabla-alertas-admin";
import { useEffect } from "react";

export const GestionAlertas = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useAlertasAdmin();
  const { alertaAdminCreada } = useAdminStore((state) => state.admin);

  useEffect(() => {
    dispatch(alertaAdminList(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (alertaAdminCreada) {
      refetch();
      dispatch(alertaAdminReset());
    }
  }, [alertaAdminCreada, dispatch]);

  const handleOpenEditModal = (alerta) => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.aprobarRechazarAlerta,
        modalProps: {
          title: "Rechazar alerta",
          size: "s",
          data: alerta,
        },
        ModalContent: GestionModal,
      })
    );
  };

  return (
    <Container title="Gestión de alertas" className="flex flex-col sm:flex-row">
      <TablaAlertasAdmin handleOpenEditModal={handleOpenEditModal} />
    </Container>
  );
};


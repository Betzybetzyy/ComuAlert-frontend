import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, modalTypesKeys } from "../../ui/shared";
import { GestionModal, TablaDomiciliosAdmin } from "./components";
import {
  domicilioAdminList,
  domicilioAdminReset,
  openModal,
  useAdminStore,
} from "../../../store";
import { useDomicilioAdmin } from "./hooks/use-domicilio-admin";

export const GestionDomicilios = () => {
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useDomicilioAdmin();
  const { domicilioAdminCreado } = useAdminStore((state) => state.admin);

  useEffect(() => {
    dispatch(domicilioAdminList(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (domicilioAdminCreado) {
      refetch();
      dispatch(domicilioAdminReset());
    }
  }, [domicilioAdminCreado, dispatch]);

  const handleOpenEditModal = (solicitud) => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.aprobarRechazarDomicilio,
        modalProps: {
          title: "Rechazar solicitud",
          size: "s",
          data: solicitud,
        },
        ModalContent: GestionModal,
      })
    );
  };

  return (
    <Container title="Alertas" className="flex flex-col sm:flex-row">
      <TablaDomiciliosAdmin handleOpenEditModal={handleOpenEditModal} />
    </Container>
  );
};

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validarFormulario } from "../utils/validations";
import { Button, Input } from "../../../ui/shared";
import { closeModal, domicilioAdminCreado } from "../../../../store";
import { useForm } from "react-hook-form";
import { useRechazarSolicitud } from "../hooks/use-domicilio-admin";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

export const GestionModal = (props) => {
  const dispatch = useDispatch();
  const schema = validarFormulario();
  const initialData = props.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: rechazarSolicitudMutation } = useRechazarSolicitud();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const formPadding = isMobile ? "px-4" : "px-12";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await rechazarSolicitudMutation({ ...data, Id: initialData.Id });
      toast.success("Solicitud rechazada");
      dispatch(domicilioAdminCreado());
      setLoading(false);
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full overflow-y-auto">
      <div className={`justify-center ${formPadding} gap-1`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-2">
            <Input
              type="textarea"
              register={register}
              schema={schema}
              name="Resolucion"
              label="Resolucion"
              placeholder="Ingrese resolucion"
              required
              variant="primary-search"
            />
          </div>
          <div className="flex justify-end mt-2 mb-4">
            <Button
              variant="danger"
              isLoading={loading}
              type="submit"
              fullWidth
            >
              Rechazar solicitud
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

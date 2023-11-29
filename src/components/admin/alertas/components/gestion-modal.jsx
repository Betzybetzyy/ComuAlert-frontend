import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validarFormulario } from "../utils/validations";
import { Button, Input } from "../../../ui/shared";
import { alertaAdminCreada, closeModal } from "../../../../store";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { useRechazarAlertas } from "../hooks/use-alertas-admin";

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

  const { mutateAsync: rechazarAlertasMutation } = useRechazarAlertas();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const formPadding = isMobile ? "px-4" : "px-12";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await rechazarAlertasMutation({ ...data, id: initialData.id });
      toast.success("Alerta rechazada");
      dispatch(alertaAdminCreada());
      setLoading(false);
      dispatch(closeModal());
    } catch ({ response: { data } }) {
      toast.error(data.message);
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

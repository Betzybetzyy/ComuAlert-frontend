import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../../ui/shared";
import { validarFormularioAlertas } from "../utils/validations";
import { useCrearAlertas } from "../hooks/use-alertas";
import { toast } from "react-toastify";
import { alertaCreada, closeModal } from "../../../store";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

export const CrearAlerta = () => {
  const dispatch = useDispatch();
  const schema = validarFormularioAlertas();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: crearAlertasMutate } = useCrearAlertas();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const formPadding = isMobile ? "px-4" : "px-12";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await crearAlertasMutate(data);
      setLoading(false);
      toast.success("Alerta creada exitosamente");
      dispatch(closeModal());
      dispatch(alertaCreada());
    } catch ({response: {data}}) {
      toast.error(data.message || "Error! Contacte al administrador")
    }
  };

  const prioridades = [
    { value: 1, label: "1 (Mínima)" },
    { value: 2, label: "2 (Baja)" },
    { value: 3, label: "3 (Moderada)" },
    { value: 4, label: "4 (Importante)" },
    { value: 5, label: "5 (Alta urgencia)" },
  ];

  return (
    <div className="p-4 flex flex-col h-full overflow-y-auto">
      <div className={`justify-center ${formPadding} gap-1`}>
        {loading ? (
          <LoadingSpinner variant="default" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                name="Motivo"
                label="Motivo"
                placeholder="Ingrese motivo"
                required
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Select
                name="Prioridad"
                label="Prioridad"
                register={register}
                schema={schema}
                options={prioridades}
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                type="textarea"
                name="Descripcion"
                label="Descripción"
                placeholder="Ingrese descripción"
                required
                variant="primary-search"
              />
            </div>
            <div className="flex justify-end mt-2 mb-4">
              <Button variant="secondary" type="submit" fullWidth>
                Agregar alerta
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

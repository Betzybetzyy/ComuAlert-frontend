import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, LoadingSpinner, Select } from "../../ui/shared";
import { validarFormularioAlertas } from "../utils/validations";
import { useEditarAlerta } from "../hooks/use-alertas";
import { toast } from "react-toastify";
import { alertaCreada, closeModal } from "../../../store";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

export const EditarAlerta = (props) => {
  const dispatch = useDispatch();
  const schema = validarFormularioAlertas;
  const [loading, setLoading] = useState(false);
  const initialData = props.data;
  const id = initialData.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      Motivo: initialData?.Motivo,
      Descripcion: initialData?.Descripcion,
      Prioridad: initialData?.Prioridad,
    },
  });

  const { mutateAsync: editarAlertaMutate } = useEditarAlerta();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const formPadding = isMobile ? "px-4" : "px-12";

  const onSubmit = async (data) => {
    try {
      const alertaData = { ...data, id };
      setLoading(true);
      await editarAlertaMutate(alertaData);
      setLoading(false);
      toast.success("Alerta editada exitosamente");
      dispatch(closeModal());
      dispatch(alertaCreada());
    } catch (error) {
      console.error(error);
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
                Editar alerta
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

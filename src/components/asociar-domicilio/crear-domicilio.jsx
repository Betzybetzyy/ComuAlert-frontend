import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useCrearDomicilio } from "./hooks/use-asociar-domicilio";
import { Button, Input, LoadingSpinner } from "../ui/shared";
import { closeModal } from "../../store";
import { validarCrearDomicilio } from "./utils/validations";

export const CrearDomicilio = () => {
  const dispatch = useDispatch();
  const schema = validarCrearDomicilio();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: crearDomicilioMutate } = useCrearDomicilio();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const formPadding = isMobile ? "px-4" : "px-12";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await crearDomicilioMutate(data);
      setLoading(false);
      toast.success("Domicilio creado exitosamente");
      dispatch(closeModal());
    } catch ({response: {data}}) {
      toast.error(data.message || "Error! Contacte al administrador")
    }
  };

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
                name="Direccion"
                label="Dirección"
                placeholder="Ingrese dirección"
                required
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                name="Comuna"
                label="Comuna"
                placeholder="Ingrese comuna"
                required
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                name="Condominio"
                label="Condominio"
                placeholder="Ingrese condominio"
                required
                variant="primary-search"
              />
            </div>
            <div className="flex justify-end mt-2 mb-4">
              <Button variant="secondary" type="submit" fullWidth>
                Agregar domicilio
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

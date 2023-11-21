import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, LoadingSpinner } from "../../ui/shared";
import { validarFormularioVehiculos } from "../utils/validations";
import { useCrearVehiculo } from "../hooks/use-vehiculos";
import { toast } from "react-toastify";
import { closeModal, vehiculoCreado } from "../../../store";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

export const CrearVehiculo = () => {
  const dispatch = useDispatch();
  const schema = validarFormularioVehiculos();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: crearVehiculoMutate } = useCrearVehiculo();
  const esVisita = watch("EsVisita");

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const formPadding = isMobile ? "px-4" : "px-12";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await crearVehiculoMutate(data);
      setLoading(false);
      toast.success("Vehiculo creado exitosamente");
      dispatch(closeModal());
      dispatch(vehiculoCreado());
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = () => {
    setValue("EsVisita", !esVisita);
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
                name="Patente"
                label="Patente"
                placeholder="Ingrese patente"
                required
                max={6}
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                name="Marca"
                label="Marca"
                placeholder="Ingrese marca"
                required
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                name="Modelo"
                label="Modelo"
                placeholder="Ingrese modelo"
                required
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                name="Ano"
                label="Año"
                placeholder="Ingrese año"
                required
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <Input
                register={register}
                schema={schema}
                name="Color"
                label="Color"
                placeholder="Ingrese color"
                required
                variant="primary-search"
              />
            </div>
            <div className="p-2">
              <div className="flex items-center">
                <label
                  htmlFor="EsVisita"
                  className="mr-2 text-sm font-medium text-slate-900"
                >
                  Es visita?
                </label>
                <input
                  type="checkbox"
                  id="EsVisita"
                  {...register("EsVisita")}
                  checked={esVisita}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
              </div>
            </div>
            <div className="flex justify-end mt-2 mb-4">
              <Button variant="secondary" type="submit" fullWidth>
                Agregar vehículo
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

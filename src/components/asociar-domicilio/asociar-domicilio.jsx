import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  LoadingSpinner,
  Select,
  modalTypesKeys,
} from "../ui/shared";
import { useForm } from "react-hook-form";
import { validarAsociarDomicilio } from "./utils/validations";
import {
  useAsociarDomicilio,
  useObtenerDomicilios,
  useObtenerPeticionAsociacion,
} from "./hooks/use-asociar-domicilio";
import { CrearDomicilio } from "./crear-domicilio";
import { useDispatch } from "react-redux";
import { logout, openModal } from "../../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ESTADOS = {
  pendiente: "PENDIENTE",
  aprobada: "APROBADO",
  rechazada: "RECHAZADO",
};

export const AsociarDomicilio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = validarAsociarDomicilio();
  const [opciones, setOpciones] = useState([]);
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [estadoPeticion, setEstadoPeticion] = useState(null);
  const [resolucion, setResolucion] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { data: peticion, isLoading: isPeticionLoading } =
    useObtenerPeticionAsociacion();
  const { data, isLoading, refetch } = useObtenerDomicilios();
  const { mutateAsync: asoiciarDomicilioMutate } = useAsociarDomicilio();

  useEffect(() => {
    if (peticion) {
      const { Estado, Resolucion } = peticion;
      setEstadoPeticion(Estado);
      setResolucion(Resolucion);
    } else {
      setEstadoPeticion(null);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const opcionesMapeadas = optionData(data);
      setOpciones(opcionesMapeadas);
    }
  }, [data]);

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalType: modalTypesKeys.asociarDomicilio,
        modalProps: {
          title: "Crear domicilio",
          size: "s",
        },
        ModalContent: CrearDomicilio,
      })
    );
  };

  const handleRefetch = async () => {
    setbuttonLoading(true);
    await refetch();
    setbuttonLoading(false);
  };

  const handleRedirect = () => {
    dispatch(logout());
    navigate("/login");
  };

  const optionData = (data) => {
    return data.map((direccion) => {
      return {
        value: direccion.id,
        label: `${direccion.Direccion} - ${direccion.Condominio}`,
      };
    });
  };

  const asociarDomicilioView = () => {
    return (
      <>
        <h1 className="text-3xl mb-2 text-slate-900 text-center">
          Seleccionar domicilio
        </h1>
        <p className="mb-4 text-center">
          Bienvenido al proceso de asignación de domicilio. Este paso es
          esencial para completar tu perfil y comenzar a utilizar todas las
          funcionalidades de la aplicación. Por favor, selecciona tu domicilio
          de la lista desplegable. Si tu dirección no aparece en la lista,
          tienes la opción de agregar una nueva dirección utilizando el botón
          correspondiente. Una vez seleccionado o agregado tu domicilio, tu
          solicitud será enviada para su aprobación y quedará en estado de
          revisión.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="mb-10">
            <Select
              register={register}
              schema={schema}
              name="domicilio"
              label="Domicilio"
              required
              variant="primary-search"
              options={opciones}
            />
            <div className="float-right mt-2 mb-4">
              <Button
                variant="primary"
                isLoading={buttonLoading}
                onClick={() => handleRefetch()}
              >
                Actualizar direcciones
              </Button>
            </div>
          </div>
          <Button variant="link" onClick={() => handleOpenModal()}>
            Agregar domicilio
          </Button>
          <div className="flex justify-end mt-2 mb-4">
            <Button variant="secondary" type="submit" fullWidth>
              Asignar dirección
            </Button>
          </div>
        </form>
      </>
    );
  };

  const esperarResolucionView = () => {
    return (
      <>
        <h1 className="text-3xl mb-2 text-slate-900 text-center">
          Solicitud en espera...
        </h1>
        <p className="mb-4 text-center">
          Tu solicitud de asignación de domicilio está actualmente en proceso de
          revisión. Agradecemos tu paciencia mientras confirmamos los detalles
          de tu dirección. Este proceso puede tomar algún tiempo, pero te
          notificaremos tan pronto como tengamos una actualización. Mientras
          tanto, si tienes alguna pregunta o necesitas asistencia adicional, no
          dudes en contactarnos.
        </p>
        <Button variant="link" onClick={() => handleRedirect()}>
          Volver
        </Button>
      </>
    );
  };

  const resolucionRechazadaView = () => {
    return (
      <>
        <h1 className="text-3xl mb-2 text-slate-900 text-center">
          Solicitud rechazada
        </h1>
        <p className="mb-4 text-center">
          Lamentamos informarte que tu solicitud de asignación de domicilio ha
          sido rechazada. En la resolución adjunta encontrarás los motivos
          específicos del rechazo. Te animamos a revisar la resolución y, si es
          necesario, realizar una nueva solicitud con la información corregida o
          actualizada. Estamos aquí para ayudarte en cada paso del proceso, así
          que no dudes en ponerte en contacto si necesitas más información o
          asistencia.
        </p>
        <p>
          Resolución:
          <p className="bg-red-400 bg-opacity-20 rounded-lg text-center ">
            {resolucion}
          </p>
        </p>

        <Button variant="link" onClick={() => handleRedirect()}>
          Volver
        </Button>
      </>
    );
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await asoiciarDomicilioMutate(data);
    toast.success("peticion creada correctamente");
    setEstadoPeticion(ESTADOS.pendiente);
  };

  return (
    <div className="flex justify-center min-h-screen pt-8">
      <div className="w-full max-w-4xl p-4">
        <Container title="" className="flex flex-col">
          {isPeticionLoading ? (
            <LoadingSpinner variant="default" />
          ) : (
            <>
              {estadoPeticion === null && asociarDomicilioView()}
              {estadoPeticion === ESTADOS.rechazada &&
                resolucionRechazadaView()}
              {estadoPeticion === ESTADOS.pendiente && esperarResolucionView()}
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

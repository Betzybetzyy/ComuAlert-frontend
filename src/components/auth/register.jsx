import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./hooks/use-login";
import { validateRegisterForm } from "./utils/validations";
import { Alert, Button, Input } from "../ui/shared";
import { rutFormat } from "../../utils/utils";
import { checkingCredentials } from "../../store";
import { errorValidation } from "./utils/errors";
import { toast } from "react-toastify";

export const Register = () => {
  const schema = validateRegisterForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: registerMutate } = useRegister();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rutFormateado, setRutFormateado] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    errors.Email && setErrorMessage(errors.Email.message);
    errors.Contrasena && setErrorMessage(errors.Contrasena.message);

    return () => {
      setErrorMessage(null);
    };
  }, [errors]);

  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      dispatch(checkingCredentials());
      const resp = await registerMutate(data);
      toast.success("Usuario creado correctamente");
      navigate("/login");
    } catch ({response: {data}}) {
      setIsLoading(false);
      setErrorMessage(data.message || errorValidation[data.status] );
    }
  };

  const handleRutChange = (e) => {
    const valorFormateado = rutFormat(e.target.value);
    setRutFormateado(valorFormateado);
  };

  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center sm:py-0 md:h-screen">
      <div className="flex flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-8 md:px-6 lg:px-0 w-full sm:w-full md:max-w-md">
        <div className="rounded-lg shadow border bg-gray-800 border-gray-700 w-full">
          <div className="p-4 sm:p-6 md:p-8 space-y-2 sm:space-y-4 md:space-y-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight text-white">
              Regístrate
            </h1>
            <form
              className="space-y-2 sm:space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Input
                  register={register}
                  schema={schema}
                  name="Email"
                  label="Correo"
                  placeholder="Ingrese correo"
                  required
                  variant="dark"
                />
              </div>
              <div>
                <Input
                  register={register}
                  schema={schema}
                  name="Rut"
                  label="Rut"
                  placeholder="Ingrese rut"
                  required
                  variant="dark"
                  onChange={handleRutChange}
                  value={rutFormateado}
                />
              </div>
              <div>
                <Input
                  register={register}
                  schema={schema}
                  name="Nombre"
                  label="Nombre"
                  placeholder="Ingrese nombre"
                  required
                  variant="dark"
                />
              </div>
              <div>
                <Input
                  register={register}
                  schema={schema}
                  name="Apellido"
                  label="Apellido"
                  placeholder="Ingrese apellido"
                  required
                  variant="dark"
                />
              </div>
              <div>
                <Input
                  register={register}
                  schema={schema}
                  type="password"
                  name="Contrasena"
                  label="Contraseña"
                  placeholder="************"
                  required
                  variant="dark"
                />
              </div>

              <div className="flex items-center w-full">
                {errorMessage && <Alert variant="danger" text={errorMessage} />}
              </div>
              <Button
                variant="secondary"
                type="submit"
                isLoading={isLoading}
                fullWidth
              >
                Registrarse
              </Button>
              <p className="text-sm font-light  text-gray-400 inline-flex items-center">
                Ya tienes una cuenta?
                <Button
                  variant="link-warning"
                  onClick={() => navigate("/login")}
                >
                  Inicia sesión
                </Button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

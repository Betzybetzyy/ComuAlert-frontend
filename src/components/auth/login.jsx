import { useForm } from "react-hook-form";
import { Input, Button, Alert } from "../ui/shared";
import { validateAuthForm } from "./utils/validations";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkingCredentials, login } from "../../store";
import { useLogin } from "./hooks/use-login";
import { errorValidation } from "./utils/errors";

export const Login = () => {
  const schema = validateAuthForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: loginData } = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      dispatch(checkingCredentials());
      const resp = await loginData(data);
      dispatch(login(resp));
      navigate("/dashboard");
    } catch ({response: {data}}) {
      setIsLoading(false);
      setErrorMessage(data.message || errorValidation[data.status] );
    }
  };

  useEffect(() => {
    errors.Email && setErrorMessage(errors.Email.message);
    errors.Contrasena && setErrorMessage(errors.Contrasena.message);

    return () => {
      setErrorMessage(null);
    };
  }, [errors]);

  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center sm:py-0 md:h-screen">
      <div className="flex flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-8 md:px-6 lg:px-0 w-full sm:w-full md:max-w-md">
        <div className="rounded-lg shadow border bg-gray-800 border-gray-700 w-full">
          <div className="p-4 sm:p-6 md:p-8 space-y-2 sm:space-y-4 md:space-y-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight text-white">
              Iniciar sesión
            </h1>
            <Alert
              variant="warning"
              icon="WarningIcon"
              text="Tu primer inicio de sesión podría tomar unos segundos adicionales mientras nuestro servidor se activa. ¡Gracias por tu paciencia!"
            />
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
                Iniciar sesión
              </Button>
              <p className="text-sm font-light  text-gray-400 inline-flex items-center">
                No tienes cuenta aún?
                <Button
                  variant="link-warning"
                  onClick={() => navigate("/register")}
                >
                  Regístrate
                </Button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

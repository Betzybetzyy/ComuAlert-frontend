export const validateAuthForm = () => {
  return {
    Email: {
      required: {
        value: true,
        message: "El email es requerido",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email no válido",
      },
    },
    Contrasena: {
      required: {
        value: true,
        message: "La contraseña es requerida",
      },
      minLength: {
        value: 4,
        message: "La contraseña debe tener al menos 4 caracteres",
      },
    },
  };
};

export const validateRegisterForm = () => {
  return {
    Email: {
      required: {
        value: true,
        message: "El email es requerido",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email no válido",
      },
    },
    Contrasena: {
      required: {
        value: true,
        message: "La contraseña es requerida",
      },
      minLength: {
        value: 4,
        message: "La contraseña debe tener al menos 4 caracteres",
      },
    },
    Rut: {},
    Nombre: {},
    Apellido: {},
  };
};

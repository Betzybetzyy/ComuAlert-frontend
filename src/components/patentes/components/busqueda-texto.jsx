import { useState } from "react";
import { Button, UncontrolledInput } from "../../ui/shared";

export const BusquedaTexto = ({ setPatente }) => {
  const [busqueda, setBusqueda] = useState("");

  const handleSubmit = () => {
    setPatente(busqueda);
  };

  const handleChange = (e) => {
    const patente = e.target.value.toUpperCase();
    e.target.value = patente;
    setBusqueda(patente);
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit(); 
    }
  };

  return (
    <div className="flex flex-col items-center">
      <UncontrolledInput
        name="busqueda"
        label="Patente"
        variant="primary-search"
        placeholder="Buscar patente"
        onChange={handleChange}
        maxLength={6}
        onKeyDown={handleEnterPress}
        value={busqueda}
      />

      <div className="mt-8 w-full">
        <Button
          variant="secondary"
          fullWidth
          onClick={handleSubmit}
          disabled={busqueda.length !== 6}
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

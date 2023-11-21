import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { usePatenteArchivo } from "../hooks/use-patente";
import { Alert, Button } from "../../ui/shared";

export const BusquedaImagen = ({ setPatente }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { mutateAsync: patenteArchivoMutate } = usePatenteArchivo();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setFileName(file.name);
    event.target.value = null;
  };

  const handleDelete = () => {
    setSelectedImage(null);
    setFileName("");
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const handleSubmit = async () => {
    try {
      setMensaje("");
      const resp = await patenteArchivoMutate(selectedImage);
      console.log(resp);
      setPatente(resp);
    } catch (error) {
      setMensaje("Error al buscar patente");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {mensaje !== "" && mensaje !== null && (
        <Alert variant="danger" text={mensaje} />
      )}
      <div className="relative inline-flex gap-x-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleUpload}
        />
        <Button variant="primary-outlined">Seleccionar archivo</Button>
        <p>{fileName}</p>
      </div>

      {selectedImage && (
        <div className="mt-2 gap-y-1">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
          <Button variant="link-danger" onClick={handleDelete}>
            Eliminar archivo
          </Button>
        </div>
      )}

      <div className="mt-2 w-full">
        <Button
          variant="secondary"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedImage}
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

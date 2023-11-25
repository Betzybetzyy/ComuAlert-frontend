import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { usePatenteArchivo } from "../hooks/use-patente";
import { Alert, Button } from "../../ui/shared";

export const BusquedaFoto = ({ setPatente }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const { mutateAsync: patenteArchivoMutate } = usePatenteArchivo();

  const agent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android/.test(agent);

  const videoConstraints = {
    facingMode: {
      exact: isMobile ? "environment" : "user",
    },
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageBlob = dataURLtoBlob(imageSrc);

    const file = new File([imageBlob], "image.jpg", {
      type: "image/jpeg",
    });

    setSelectedImage(file);
  };

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    try {
      setMensaje("");
      const resp = await patenteArchivoMutate(selectedImage);
      setPatente(resp);
    } catch ({response: {data}}) {
      setMensaje(data.message || 'Error, contacte al administrador')
    }
  };

  const dataURLtoBlob = (dataurl) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="flex flex-col items-center">
      {mensaje !== "" && mensaje !== null && (
        <Alert variant="danger" text={mensaje} />
      )}

      <div className="self-start">
        <Button variant="link" onClick={handleCameraToggle}>
          {isCameraOn ? "Apagar cámara" : "Encender cámara"}
        </Button>
      </div>

      {isCameraOn && (
        <div className="mt-2 flex flex-col items-center">
          <Webcam
            ref={webcamRef}
            videoConstraints={videoConstraints}
            width={300}
            height={200}
            screenshotFormat="image/jpeg"
          />
          <div className="mt-2">
            <Button
              variant="primary-outlined"
              icon="PhotoIcon"
              onClick={capture}
            >
              Tomar foto
            </Button>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="mt-2 flex flex-col items-center">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
          <Button variant="link-danger" onClick={handleDelete}>
            Eliminar foto
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

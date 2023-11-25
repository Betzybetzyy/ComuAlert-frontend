import React from "react";
import { Container } from "../ui/shared";

export const Visitas = () => {
  return (
    <Container title="Visitas">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-50 rounded-lg">
        <svg
          className="h-48 w-48" // Esto establece el tamaño del SVG
          viewBox="0 0 297.5 297.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            fill="#0B77A5"
            points="277.19,51.82 277.19,121.41 207.59,121.41"
          />
          <polygon
            fill="#0B77A5"
            points="176.45,37.63 92.67,121.41 34.51,121.41 118.29,37.63"
          />
          <polygon
            fill="#FCBF31"
            points="89.91,37.63 20.32,107.22 20.32,37.63"
          />
          <polygon
            fill="#FCBF31"
            points="263,37.63 179.21,121.41 121.05,121.41 204.83,37.63"
          />
          <path d="M297.25,27.59v103.85c0,5.54-4.49,10.04-10.03,10.04h-24.58v118.39h7.27c5.54,0,10.03,4.5,10.03,10.04 s-4.49,10.03-10.03,10.03h-34.62c-5.54,0-10.03-4.49-10.03-10.03s4.49-10.04,10.03-10.04h7.28V141.48H54.94v118.39h7.27 c5.54,0,10.04,4.5,10.04,10.04s-4.5,10.03-10.04,10.03H27.6c-5.55,0-10.04-4.49-10.04-10.03s4.49-10.04,10.04-10.04h7.27V141.48 H10.29c-5.54,0-10.04-4.5-10.04-10.04V27.59c0-5.54,4.5-10.03,10.04-10.03h276.93C292.76,17.56,297.25,22.05,297.25,27.59z M277.19,121.41V51.82l-69.6,69.59H277.19z M179.21,121.41L263,37.63h-58.17l-83.78,83.78H179.21z M92.67,121.41l83.78-83.78 h-58.16l-83.78,83.78H92.67z M20.32,107.22l69.59-69.59H20.32V107.22z"></path>
        </svg>
        <h1 className="mt-4 text-2xl font-bold text-gray-700">
          Sitio en construcción
        </h1>
      </div>
    </Container>
  );
};
export const moneyFormat = (value) => {
  value = Math.trunc(value);
  return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const dateFormat = (date, timeZone = "America/Santiago") => {
  const fecha = new Date(date);

  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timeZone,
  };

  return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
};

export const uuidGenerator = () => {
  const segmentos = [8, 4, 4, 4, 12];

  const uuid = segmentos
    .map((segmento) => {
      return Array.from({ length: segmento }, () => {
        return Math.floor(Math.random() * 16).toString(16);
      }).join("");
    })
    .join("-");

  return uuid;
};

export const rutFormat = (rutSinFormato) => {
  let valor = rutSinFormato.replace(/[^0-9kK]+/g, "").toUpperCase();
  if (valor.length > 10) {
    valor = valor.substring(0, 10);
  }

  return valor;
};

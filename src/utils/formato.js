// Funciones de apoyo para mostrar precios y fechas.

const formatoPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

// 689000 -> "$689.000"
export function formatearPrecio(valor) {
  return formatoPrecio.format(valor);
}

// "2027-01-10" -> "10 ene 2027". Se usa UTC para evitar desfases por zona horaria.
export function formatearFecha(fechaIso) {
  const fecha = new Date(`${fechaIso}T00:00:00Z`);
  if (Number.isNaN(fecha.getTime())) {
    return fechaIso;
  }
  return fecha.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Cantidad de noches entre dos fechas ISO. Si algo es inválido devuelve 0.
export function calcularNoches(fechaDesde, fechaHasta) {
  const desde = new Date(`${fechaDesde}T00:00:00Z`).getTime();
  const hasta = new Date(`${fechaHasta}T00:00:00Z`).getTime();
  if (Number.isNaN(desde) || Number.isNaN(hasta) || hasta < desde) {
    return 0;
  }
  return Math.round((hasta - desde) / (1000 * 60 * 60 * 24));
}

// Indica si el rango [desde, hasta] está contenido en el rango [inicio, fin].
// Las fechas ISO (AAAA-MM-DD) se pueden comparar directamente como texto.
export function rangoDentroDe(desde, hasta, inicio, fin) {
  return desde >= inicio && hasta <= fin;
}

// "Directo", "1 escala", "2 escalas"
export function textoEscalas(escalas) {
  if (escalas === 0) return 'Directo';
  return escalas === 1 ? '1 escala' : `${escalas} escalas`;
}

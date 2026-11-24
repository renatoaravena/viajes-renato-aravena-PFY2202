// Etiqueta de disponibilidad reutilizada por vuelos (asientos) y hoteles (habitaciones).
function Disponibilidad({ cantidad, unidad }) {
  let clases = 'bg-green-100 text-green-800';
  let texto = `${cantidad} ${unidad} disponibles`;

  if (cantidad === 0) {
    clases = 'bg-red-100 text-red-800';
    texto = 'Agotado';
  } else if (cantidad <= 3) {
    clases = 'bg-amber-100 text-amber-800';
    texto = `Quedan ${cantidad}`;
  }

  return (
    <span className={`whitespace-nowrap rounded px-2.5 py-0.5 text-xs font-bold ${clases}`}>
      {texto}
    </span>
  );
}

export default Disponibilidad;

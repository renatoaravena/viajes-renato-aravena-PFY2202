import { Link } from 'react-router-dom';

function DestinoCard({ destino }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white">
      {/* Franja con el color propio de cada destino */}
      <div className="h-1.5" style={{ backgroundColor: destino.color }} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-xl font-bold">{destino.nombre}</h3>
        <p className="mb-2 text-sm text-slate-600">
          {destino.pais} · {destino.continente}
        </p>
        <p className="mb-4">{destino.descripcion}</p>

        <Link
          to={`/destinos/${destino.id}`}
          className="boton boton-primario mt-auto"
          aria-label={`Ver vuelos y hoteles de ${destino.nombre}`}
        >
          Ver vuelos y hoteles
        </Link>
      </div>
    </article>
  );
}

export default DestinoCard;

import { formatearFecha, formatearPrecio } from '../utils/formato';
import Disponibilidad from './Disponibilidad';

function HotelCard({ hotel, seleccionado, onSeleccionar }) {
  const agotado = hotel.habitacionesDisponibles === 0;

  return (
    <article
      className={`flex flex-col gap-2 rounded-md border-2 p-4 ${
        seleccionado ? 'border-primario bg-primario-claro' : 'border-slate-200 bg-white'
      } ${agotado ? 'opacity-75' : ''}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="text-lg font-bold">{hotel.nombre}</h4>
        <Disponibilidad cantidad={hotel.habitacionesDisponibles} unidad="habitaciones" />
      </div>

      <p className="text-sm text-slate-600">
        <span className="tracking-wide text-amber-700" role="img" aria-label={`${hotel.estrellas} estrellas`}>
          {'★'.repeat(hotel.estrellas)}
        </span>{' '}
        · {hotel.ubicacion}
      </p>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-600">Disponible desde</dt>
          <dd className="font-semibold">{formatearFecha(hotel.fechaDesde)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-600">Disponible hasta</dt>
          <dd className="font-semibold">{formatearFecha(hotel.fechaHasta)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
        <p className="text-xl font-bold text-primario-oscuro">
          {formatearPrecio(hotel.precioPorNoche)}{' '}
          <span className="text-xs font-normal text-slate-600">por noche</span>
        </p>
        <button
          type="button"
          className={`boton ${seleccionado ? 'boton-secundario' : 'boton-primario'}`}
          onClick={() => onSeleccionar(hotel)}
          disabled={agotado}
          aria-pressed={seleccionado}
        >
          {agotado ? 'Sin disponibilidad' : seleccionado ? 'Quitar hotel' : 'Elegir hotel'}
        </button>
      </div>
    </article>
  );
}

export default HotelCard;

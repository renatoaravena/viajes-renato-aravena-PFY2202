import { formatearFecha, formatearPrecio, textoEscalas } from '../utils/formato';
import Disponibilidad from './Disponibilidad';

function VueloCard({ vuelo, destinoNombre, seleccionado, onSeleccionar }) {
  const agotado = vuelo.asientosDisponibles === 0;

  return (
    <article
      className={`flex flex-col gap-2 rounded-md border-2 p-4 ${
        seleccionado ? 'border-primario bg-primario-claro' : 'border-slate-200 bg-white'
      } ${agotado ? 'opacity-75' : ''}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="text-lg font-bold">{vuelo.aerolinea}</h4>
        <Disponibilidad cantidad={vuelo.asientosDisponibles} unidad="asientos" />
      </div>

      <p className="text-sm text-slate-600">
        {vuelo.origen} → {destinoNombre}
      </p>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-600">Salida</dt>
          <dd className="font-semibold">{formatearFecha(vuelo.fechaSalida)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-600">Regreso</dt>
          <dd className="font-semibold">{formatearFecha(vuelo.fechaRegreso)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-600">Duración</dt>
          <dd className="font-semibold">{vuelo.duracion}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-600">Escalas</dt>
          <dd className="font-semibold">{textoEscalas(vuelo.escalas)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
        <p className="text-xl font-bold text-primario-oscuro">
          {formatearPrecio(vuelo.precio)}{' '}
          <span className="text-xs font-normal text-slate-600">por persona</span>
        </p>
        <button
          type="button"
          className={`boton ${seleccionado ? 'boton-secundario' : 'boton-primario'}`}
          onClick={() => onSeleccionar(vuelo)}
          disabled={agotado}
          aria-pressed={seleccionado}
        >
          {agotado ? 'Agotado' : seleccionado ? 'Quitar vuelo' : 'Elegir vuelo'}
        </button>
      </div>
    </article>
  );
}

export default VueloCard;

import { calcularNoches, formatearFecha, formatearPrecio, rangoDentroDe } from '../utils/formato';

const claseTitulo = 'text-xs font-bold uppercase tracking-wide text-slate-600';

// Resumen del viaje con el vuelo y el hotel elegidos por el usuario.
function ResumenViaje({ destino, vuelo, hotel, onLimpiar }) {
  const noches = vuelo ? calcularNoches(vuelo.fechaSalida, vuelo.fechaRegreso) : 0;
  const totalHotel = hotel && vuelo ? hotel.precioPorNoche * noches : 0;
  const total = (vuelo ? vuelo.precio : 0) + totalHotel;

  // Si ambos están elegidos, se revisa que el hotel tenga disponibilidad en las fechas del vuelo.
  const fechasFueraDeRango =
    vuelo && hotel && !rangoDentroDe(vuelo.fechaSalida, vuelo.fechaRegreso, hotel.fechaDesde, hotel.fechaHasta);

  return (
    <aside
      className="self-start rounded-md border-2 border-primario bg-white p-4 lg:sticky lg:top-20"
      aria-label="Resumen de tu viaje"
    >
      <h3 className="mb-3 text-lg font-bold">Tu viaje a {destino.nombre}</h3>

      {!vuelo && !hotel && (
        <p className="text-slate-600">Elige un vuelo y un hotel para armar tu viaje.</p>
      )}

      {vuelo && (
        <div className="mb-2.5 border-b border-slate-300 pb-2.5">
          <h4 className={claseTitulo}>Vuelo</h4>
          <p>{vuelo.aerolinea}</p>
          <p className="text-sm text-slate-600">
            {formatearFecha(vuelo.fechaSalida)} – {formatearFecha(vuelo.fechaRegreso)} ({noches} noches)
          </p>
          <p className="font-bold">{formatearPrecio(vuelo.precio)}</p>
        </div>
      )}

      {hotel && (
        <div className="mb-2.5 border-b border-slate-300 pb-2.5">
          <h4 className={claseTitulo}>Hotel</h4>
          <p>{hotel.nombre}</p>
          {vuelo ? (
            <>
              <p className="text-sm text-slate-600">
                {noches} noches × {formatearPrecio(hotel.precioPorNoche)}
              </p>
              <p className="font-bold">{formatearPrecio(totalHotel)}</p>
            </>
          ) : (
            <p className="text-sm text-slate-600">
              {formatearPrecio(hotel.precioPorNoche)} por noche. Elige un vuelo para calcular el total.
            </p>
          )}
        </div>
      )}

      {fechasFueraDeRango && (
        <p className="mb-3 rounded-md bg-amber-100 px-2.5 py-2 text-sm text-amber-800" role="alert">
          Atención: el hotel no tiene disponibilidad para todas las fechas del vuelo (disponible del{' '}
          {formatearFecha(hotel.fechaDesde)} al {formatearFecha(hotel.fechaHasta)}).
        </p>
      )}

      {vuelo && (
        <p className="mb-3 text-lg">
          Total estimado:{' '}
          <strong className="block text-2xl text-primario-oscuro">{formatearPrecio(total)}</strong>
        </p>
      )}

      {(vuelo || hotel) && (
        <button type="button" className="boton boton-secundario" onClick={onLimpiar}>
          Limpiar selección
        </button>
      )}
    </aside>
  );
}

export default ResumenViaje;

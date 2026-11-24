import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { obtenerDestino } from '../services/api';
import { OBTENER_OPCIONES_DESTINO } from '../graphql/queries';
import { mensajeErrorGraphQL } from '../utils/errores';
import VueloCard from '../components/VueloCard';
import HotelCard from '../components/HotelCard';
import ResumenViaje from '../components/ResumenViaje';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function DestinoDetalle() {
  // Parámetro de la ruta /destinos/:id
  const { id } = useParams();

  // 1) Información del destino: llega desde la API REST
  const [destino, setDestino] = useState(null);
  const [cargandoDestino, setCargandoDestino] = useState(true);
  const [errorDestino, setErrorDestino] = useState(null);
  const [intento, setIntento] = useState(0);

  // 2) Selección del usuario
  const [vueloElegido, setVueloElegido] = useState(null);
  const [hotelElegido, setHotelElegido] = useState(null);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarDestino() {
      setCargandoDestino(true);
      setErrorDestino(null);
      setDestino(null);
      // Al cambiar de destino se reinicia la selección
      setVueloElegido(null);
      setHotelElegido(null);
      try {
        const datos = await obtenerDestino(id, controlador.signal);
        setDestino(datos);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setErrorDestino(err);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargandoDestino(false);
        }
      }
    }

    cargarDestino();
    return () => controlador.abort();
  }, [id, intento]);

  // 3) Vuelos y hoteles del destino: llegan desde la API GraphQL.
  // Solo se consulta cuando el destino ya se cargó correctamente.
  const {
    data,
    loading: cargandoOpciones,
    error: errorOpciones,
    refetch,
  } = useQuery(OBTENER_OPCIONES_DESTINO, {
    variables: { destinoId: id },
    skip: !destino || String(destino.id) !== id,
    notifyOnNetworkStatusChange: true,
  });

  // Si la respuesta no trae opciones, se trabaja con listas vacías
  const opciones = data && data.opcionesDestino ? data.opcionesDestino : null;
  const vuelos = opciones ? opciones.vuelos : [];
  const hoteles = opciones ? opciones.hoteles : [];

  // El título de la pestaña cambia según el destino cargado
  useEffect(() => {
    document.title = destino ? `Viajes Renato | ${destino.nombre}` : 'Viajes Renato | Destino';
  }, [destino]);

  const alternarVuelo = (vuelo) => {
    setVueloElegido(vueloElegido && vueloElegido.id === vuelo.id ? null : vuelo);
  };

  const alternarHotel = (hotel) => {
    setHotelElegido(hotelElegido && hotelElegido.id === hotel.id ? null : hotel);
  };

  const limpiarSeleccion = () => {
    setVueloElegido(null);
    setHotelElegido(null);
  };

  const reintentarOpciones = () => {
    // refetch devuelve una promesa que falla si vuelve a haber error: el error ya se muestra en pantalla.
    refetch().catch(() => {});
  };

  // ----- Render -----

  if (cargandoDestino) {
    return (
      <section className="pt-6">
        <Loading mensaje="Cargando destino..." />
      </section>
    );
  }

  if (errorDestino || !destino) {
    return (
      <section className="pt-6">
        <Link to="/destinos" className="mb-3 inline-block font-semibold text-primario underline">
          ← Volver a destinos
        </Link>
        <ErrorMessage
          titulo="No pudimos cargar el destino"
          mensaje={errorDestino ? errorDestino.message : 'No se encontró información del destino.'}
          // Si el destino no existe (404) reintentar no sirve, así que no se ofrece el botón
          onReintentar={errorDestino && errorDestino.status !== 404 ? () => setIntento(intento + 1) : undefined}
        />
      </section>
    );
  }

  return (
    <section className="pt-6">
      <Link to="/destinos" className="mb-3 inline-block font-semibold text-primario underline">
        ← Volver a destinos
      </Link>

      <header
        className="mb-6 rounded-md border border-l-8 border-slate-200 bg-white p-5 sm:p-6"
        style={{ borderLeftColor: destino.color }}
      >
        <h1 className="text-3xl font-bold">{destino.nombre}</h1>
        <p className="mb-2 font-semibold text-slate-600">
          {destino.pais} · {destino.continente}
        </p>
        <p className="mb-4">{destino.descripcion}</p>
        <h2 className="mb-1.5 text-sm font-bold">Actividades populares</h2>
        <ul className="flex flex-wrap gap-1.5">
          {destino.actividades.map((actividad) => (
            <li key={actividad} className="rounded bg-slate-100 px-2 py-0.5 text-sm text-slate-700">
              {actividad}
            </li>
          ))}
        </ul>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-7">
          {cargandoOpciones && <Loading mensaje="Buscando vuelos y hoteles..." />}

          {!cargandoOpciones && errorOpciones && (
            <ErrorMessage
              titulo="No pudimos cargar los vuelos y hoteles"
              mensaje={mensajeErrorGraphQL(errorOpciones)}
              onReintentar={reintentarOpciones}
            />
          )}

          {!cargandoOpciones && !errorOpciones && opciones && (
            <>
              <section aria-labelledby="titulo-vuelos">
                <h2 id="titulo-vuelos" className="mb-3 text-2xl font-bold">
                  Vuelos
                </h2>
                {vuelos.length === 0 ? (
                  <p className="rounded-md border border-dashed border-slate-300 bg-white p-5 text-center text-slate-600">
                    No hay vuelos publicados para este destino.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {vuelos.map((vuelo) => (
                      <VueloCard
                        key={vuelo.id}
                        vuelo={vuelo}
                        destinoNombre={destino.nombre}
                        seleccionado={vueloElegido !== null && vueloElegido.id === vuelo.id}
                        onSeleccionar={alternarVuelo}
                      />
                    ))}
                  </div>
                )}
              </section>

              <section aria-labelledby="titulo-hoteles">
                <h2 id="titulo-hoteles" className="mb-3 text-2xl font-bold">
                  Hoteles
                </h2>
                {hoteles.length === 0 ? (
                  <p className="rounded-md border border-dashed border-slate-300 bg-white p-5 text-center text-slate-600">
                    No hay hoteles publicados para este destino.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {hoteles.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        seleccionado={hotelElegido !== null && hotelElegido.id === hotel.id}
                        onSeleccionar={alternarHotel}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>

        <ResumenViaje
          destino={destino}
          vuelo={vueloElegido}
          hotel={hotelElegido}
          onLimpiar={limpiarSeleccion}
        />
      </div>
    </section>
  );
}

export default DestinoDetalle;

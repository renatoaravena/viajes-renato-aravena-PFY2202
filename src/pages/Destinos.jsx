import { useEffect, useState } from 'react';
import { obtenerDestinos } from '../services/api';
import DestinoCard from '../components/DestinoCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

function Destinos() {
  // Datos que llegan desde la API REST
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  // Se incrementa para volver a ejecutar la carga cuando el usuario pulsa "Reintentar"
  const [intento, setIntento] = useState(0);

  // Filtros de la interfaz
  const [busqueda, setBusqueda] = useState('');
  const [continente, setContinente] = useState('Todos');

  // Actualiza el título de la pestaña del navegador
  useEffect(() => {
    document.title = 'Viajes Renato | Destinos';
  }, []);

  // Carga los destinos desde la API REST (se repite al pulsar "Reintentar")
  useEffect(() => {
    const controlador = new AbortController();

    async function cargarDestinos() {
      setCargando(true);
      setError('');
      try {
        const datos = await obtenerDestinos(controlador.signal);
        if (!Array.isArray(datos)) {
          throw new Error('La respuesta del servidor no tiene el formato esperado.');
        }
        setDestinos(datos);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarDestinos();

    // Limpieza: cancela la petición si el componente se desmonta
    return () => controlador.abort();
  }, [intento]);

  const continentes = ['Todos', ...new Set(destinos.map((d) => d.continente))];

  const texto = busqueda.trim().toLowerCase();
  const destinosFiltrados = destinos.filter((d) => {
    const coincideTexto =
      d.nombre.toLowerCase().includes(texto) || d.pais.toLowerCase().includes(texto);
    const coincideContinente = continente === 'Todos' || d.continente === continente;
    return coincideTexto && coincideContinente;
  });

  return (
    <section className="pt-6">
      <h1 className="text-3xl font-bold">Destinos disponibles</h1>
      <p className="text-slate-600">Elige un destino para ver sus vuelos y hoteles.</p>

      {cargando && <Loading mensaje="Cargando destinos..." />}

      {!cargando && error && (
        <ErrorMessage
          titulo="No pudimos cargar los destinos"
          mensaje={error}
          onReintentar={() => setIntento(intento + 1)}
        />
      )}

      {!cargando && !error && (
        <>
          <form className="mb-2 mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]" onSubmit={(e) => e.preventDefault()} role="search">
            <div className="flex flex-col gap-1">
              <label htmlFor="busqueda" className="text-sm font-semibold">Buscar por destino o país</label>
              <input
                id="busqueda"
                type="search"
                className="min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2.5"
                placeholder="Ej: Roma, Perú..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="continente" className="text-sm font-semibold">Continente</label>
              <select
                id="continente"
                className="min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2.5"
                value={continente}
                onChange={(e) => setContinente(e.target.value)}
              >
                {continentes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <p className="mb-2 text-sm text-slate-600" aria-live="polite">
            {destinosFiltrados.length} {destinosFiltrados.length === 1 ? 'destino' : 'destinos'}
          </p>

          {destinosFiltrados.length === 0 ? (
            <p className="my-4 rounded-md border border-dashed border-slate-300 bg-white p-5 text-center text-slate-600">
              No encontramos destinos que coincidan con tu búsqueda. Prueba con otro nombre o continente.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destinosFiltrados.map((destino) => (
                <DestinoCard key={destino.id} destino={destino} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Destinos;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const pasos = [
  { titulo: 'Elige un destino', texto: 'Revisa el país y las actividades más populares de cada lugar.' },
  { titulo: 'Compara vuelos y hoteles', texto: 'Mira precios, fechas y cuántos cupos quedan en cada opción.' },
  { titulo: 'Arma tu viaje', texto: 'Selecciona un vuelo y un hotel y revisa el total estimado.' },
];

function Home() {
  // Actualiza el título de la pestaña del navegador
  useEffect(() => {
    document.title = 'Viajes Renato | Inicio';
  }, []);

  return (
    <>
      <section className="my-6 rounded-md bg-primario-oscuro px-5 py-10 text-white sm:px-10 sm:py-14">
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">Planifica tu próximo viaje</h1>
        <p className="mb-6 max-w-xl text-lg text-slate-200">
          Revisa los destinos disponibles, compara vuelos y hoteles y calcula cuánto costaría tu viaje.
        </p>
        <Link to="/destinos" className="boton boton-acento">
          Ver destinos
        </Link>
      </section>

      <section aria-labelledby="titulo-pasos">
        <h2 id="titulo-pasos" className="text-2xl font-bold">
          Cómo funciona
        </h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {pasos.map((paso, indice) => (
            <li key={paso.titulo} className="rounded-md border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-primario">Paso {indice + 1}</p>
              <h3 className="text-lg font-bold">{paso.titulo}</h3>
              <p className="text-slate-700">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default Home;

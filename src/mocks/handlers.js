import { http, graphql, HttpResponse, delay } from 'msw';
import { destinos, opcionesPorDestino } from './data';

// Para simular fallas del servidor (y probar el manejo de errores) se puede
// ejecutar en la consola del navegador, y luego recargar la página:
//   sessionStorage.setItem('mock-fallo', 'rest')     -> la API REST responde 500
//   sessionStorage.setItem('mock-fallo', 'graphql')  -> la API GraphQL responde con errores
//   sessionStorage.setItem('mock-fallo', 'red')      -> ambas APIs simulan caída de red
//   sessionStorage.removeItem('mock-fallo')          -> vuelve al funcionamiento normal
function obtenerModoFallo() {
  try {
    return sessionStorage.getItem('mock-fallo');
  } catch (error) {
    return null;
  }
}

const apiGraphQL = graphql.link('/graphql');

export const handlers = [
  // ---------- REST ----------

  // GET /api/destinos -> lista de destinos disponibles
  http.get('/api/destinos', async () => {
    await delay(600);
    const fallo = obtenerModoFallo();

    if (fallo === 'red') {
      return HttpResponse.error();
    }
    if (fallo === 'rest') {
      return HttpResponse.json(
        { mensaje: 'Error interno del servidor. Inténtalo nuevamente más tarde.' },
        { status: 500 }
      );
    }

    return HttpResponse.json(destinos);
  }),

  // GET /api/destinos/:id -> detalle de un destino
  http.get('/api/destinos/:id', async ({ params }) => {
    await delay(400);
    const fallo = obtenerModoFallo();

    if (fallo === 'red') {
      return HttpResponse.error();
    }
    if (fallo === 'rest') {
      return HttpResponse.json(
        { mensaje: 'Error interno del servidor. Inténtalo nuevamente más tarde.' },
        { status: 500 }
      );
    }

    const destino = destinos.find((d) => String(d.id) === params.id);
    if (!destino) {
      return HttpResponse.json(
        { mensaje: 'El destino solicitado no existe.' },
        { status: 404 }
      );
    }

    return HttpResponse.json(destino);
  }),

  // ---------- GraphQL ----------

  // query ObtenerOpcionesDestino($destinoId: ID!) -> vuelos y hoteles de un destino
  apiGraphQL.query('ObtenerOpcionesDestino', async ({ variables }) => {
    await delay(800);
    const fallo = obtenerModoFallo();

    if (fallo === 'red') {
      return HttpResponse.error();
    }
    if (fallo === 'graphql') {
      return HttpResponse.json({
        errors: [{ message: 'Error interno del servicio de vuelos y hoteles.' }],
      });
    }

    const { destinoId } = variables;
    if (!destinoId) {
      return HttpResponse.json({
        errors: [{ message: 'El parámetro destinoId es obligatorio.' }],
      });
    }

    const opciones = opcionesPorDestino[destinoId];
    if (!opciones) {
      return HttpResponse.json({
        errors: [
          {
            message: `No se encontró el destino con id ${destinoId}.`,
            extensions: { code: 'NOT_FOUND' },
          },
        ],
      });
    }

    // Se incluye __typename porque Apollo Client lo usa para su caché.
    return HttpResponse.json({
      data: {
        opcionesDestino: {
          __typename: 'OpcionesDestino',
          vuelos: opciones.vuelos.map((v) => ({ __typename: 'Vuelo', ...v })),
          hoteles: opciones.hoteles.map((h) => ({ __typename: 'Hotel', ...h })),
        },
      },
    });
  }),
];

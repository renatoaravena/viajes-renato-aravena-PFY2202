// Funciones para consumir la API REST (mock) de destinos.

const MENSAJE_RED =
  'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.';

async function pedirJson(url, signal) {
  let respuesta;

  try {
    respuesta = await fetch(url, { signal });
  } catch (error) {
    // Si la petición se cancela (por ejemplo, al salir de la página) se propaga tal cual.
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(MENSAJE_RED);
  }

  if (!respuesta.ok) {
    let mensaje = `Ocurrió un error al consultar el servidor (código ${respuesta.status}).`;
    try {
      const cuerpo = await respuesta.json();
      if (cuerpo && cuerpo.mensaje) {
        mensaje = cuerpo.mensaje;
      }
    } catch (error) {
      // El cuerpo no era JSON: se mantiene el mensaje genérico.
    }
    const errorHttp = new Error(mensaje);
    errorHttp.status = respuesta.status;
    throw errorHttp;
  }

  try {
    return await respuesta.json();
  } catch (error) {
    throw new Error('La respuesta del servidor no tiene un formato válido.');
  }
}

// GET /api/destinos
export function obtenerDestinos(signal) {
  return pedirJson('/api/destinos', signal);
}

// GET /api/destinos/:id
export function obtenerDestino(id, signal) {
  return pedirJson(`/api/destinos/${encodeURIComponent(id)}`, signal);
}

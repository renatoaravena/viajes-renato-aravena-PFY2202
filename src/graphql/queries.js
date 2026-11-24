import { gql } from '@apollo/client';

// Consulta los vuelos y hoteles de un destino. Solo se piden los campos
// que la interfaz necesita.
export const OBTENER_OPCIONES_DESTINO = gql`
  query ObtenerOpcionesDestino($destinoId: ID!) {
    opcionesDestino(destinoId: $destinoId) {
      vuelos {
        id
        aerolinea
        origen
        fechaSalida
        fechaRegreso
        duracion
        escalas
        precio
        asientosDisponibles
      }
      hoteles {
        id
        nombre
        estrellas
        ubicacion
        precioPorNoche
        fechaDesde
        fechaHasta
        habitacionesDisponibles
      }
    }
  }
`;

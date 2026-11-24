// Convierte un error de Apollo Client en un mensaje entendible para el usuario.
export function mensajeErrorGraphQL(error) {
  if (!error) return '';

  // Errores de red: el servidor no respondió o respondió algo inválido.
  if (error.networkError) {
    return 'No se pudo conectar con el servicio de vuelos y hoteles. Revisa tu conexión e inténtalo nuevamente.';
  }

  // Errores devueltos por GraphQL dentro del campo "errors".
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors[0].message;
  }

  return 'Ocurrió un error inesperado al consultar vuelos y hoteles.';
}

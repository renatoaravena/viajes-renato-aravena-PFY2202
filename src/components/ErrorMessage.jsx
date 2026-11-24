// Muestra un mensaje de error y, si se entrega onReintentar, un botón para volver a intentar.
function ErrorMessage({ titulo = 'Algo salió mal', mensaje, onReintentar }) {
  return (
    <div
      className="my-4 rounded-md border border-red-300 bg-red-100 p-5 text-center text-red-800"
      role="alert"
    >
      <h3 className="text-lg font-bold text-red-800">{titulo}</h3>
      <p className="mb-3">{mensaje}</p>
      {onReintentar && (
        <button type="button" className="boton boton-secundario" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

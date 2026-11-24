function Loading({ mensaje = 'Cargando...' }) {
  return (
    <div className="my-4 p-5 text-center text-slate-600" role="status" aria-live="polite">
      <span
        className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-primario-claro border-t-primario motion-reduce:animate-none"
        aria-hidden="true"
      ></span>
      <p className="mt-2">{mensaje}</p>
    </div>
  );
}

export default Loading;

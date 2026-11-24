import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  useEffect(() => {
    document.title = 'Viajes Renato | Página no encontrada';
  }, []);

  return (
    <section className="pt-16 text-center">
      <h1 className="mb-2 text-3xl font-bold">Página no encontrada</h1>
      <p className="mb-4">La dirección que buscas no existe o fue movida.</p>
      <Link to="/" className="boton boton-primario">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;

import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  // Controla si el menú está abierto en pantallas pequeñas.
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);
  const claseEnlace = ({ isActive }) =>
    `rounded-md px-3.5 py-3 font-semibold sm:py-2 ${
      isActive ? 'bg-white/15 text-white' : 'text-slate-200 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-10 bg-primario-oscuro text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-white" onClick={cerrarMenu}>
          Viajes Renato
        </Link>

        <button
          type="button"
          className="rounded-md border border-white/60 px-3 py-1.5 sm:hidden"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? 'Cerrar menú' : 'Menú'}
        </button>

        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${menuAbierto ? 'flex' : 'hidden'} w-full flex-col gap-2 sm:flex sm:w-auto sm:flex-row`}
        >
          <NavLink to="/" end className={claseEnlace} onClick={cerrarMenu}>
            Inicio
          </NavLink>
          <NavLink to="/destinos" className={claseEnlace} onClick={cerrarMenu}>
            Destinos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

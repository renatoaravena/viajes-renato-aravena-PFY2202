import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinos from './pages/Destinos';
import DestinoDetalle from './pages/DestinoDetalle';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="absolute -left-[9999px] z-50 bg-acento px-3 py-2 text-black focus:left-2 focus:top-2"
        href="#contenido"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DestinoDetalle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

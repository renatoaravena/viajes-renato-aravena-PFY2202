import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './graphql/client';
import { worker } from './mocks/browser';
import './index.css';

// Primero se inicia el backend mock (MSW) y luego se renderiza la aplicación,
// así la primera petición ya es interceptada.
// Se usa HashRouter para que las rutas también funcionen en GitHub Pages.
async function iniciar() {
  try {
    await worker.start({
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    // Si el mock no arranca, la app igual se muestra y comunicará el error de conexión.
    console.error('No se pudo iniciar el backend mock (MSW):', error);
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </HashRouter>
      </ApolloProvider>
    </React.StrictMode>
  );
}

iniciar();

# Viajes Renato

Proyecto de la **Experiencia 2 – Semana 5** de *Desarrollo Frontend II (PFY2202)*: "Integrando nuestro frontend con backend".

Aplicación web para una agencia de viajes donde el usuario explora destinos, elige uno y revisa los vuelos y hoteles disponibles para planificar su viaje.

- **Autor:** Renato Aravena
- **Repositorio:** `viajes-renato-aravena-PFY2202`
- **Sitio publicado (GitHub Pages):** `https://<tu-usuario>.github.io/viajes-renato-aravena-PFY2202/`

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| React 18 + Vite 5 | Interfaz, componentes y servidor de desarrollo / build |
| React Router DOM 6 (`HashRouter`) | Navegación entre páginas |
| Mock Service Worker (MSW 2) | Backend mock (intercepta las peticiones en el navegador) |
| API REST mock | Lista de destinos (país y actividades populares) |
| Apollo Client 3 + GraphQL | Consulta de vuelos y hoteles por destino |
| Tailwind CSS 3 | Estilos responsivos con clases utilitarias (`sm:`, `md:`, `lg:`), configurado en `tailwind.config.js` |

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior y npm.

```bash
npm install
npm run dev
```

Abrir <http://localhost:5173> (la URL aparece en la terminal). No necesita ningún servidor adicional: el backend mock corre dentro del navegador gracias a MSW (el archivo `public/mockServiceWorker.js` ya viene incluido).

Otros comandos:

```bash
npm test          # pruebas unitarias (Vitest) de las funciones de utilidad
npm run build     # build de producción en la carpeta dist
npm run preview   # sirve el build para revisarlo localmente
npm run deploy    # publica la carpeta dist en la rama gh-pages
```

## Funcionalidades

1. **Inicio (`/`)**: presentación de la agencia.
2. **Destinos (`/destinos`)**: lista de destinos obtenida con **REST** (`GET /api/destinos`), con país, continente y una descripción breve. Incluye búsqueda por nombre/país y filtro por continente.
3. **Detalle de destino (`/destinos/:id`)**:
   - Información del destino y sus actividades populares con **REST** (`GET /api/destinos/:id`).
   - Vuelos y hoteles con **GraphQL** (`query ObtenerOpcionesDestino`), con precios, fechas y disponibilidad.
   - El usuario puede elegir un vuelo y un hotel; el **resumen del viaje** calcula las noches y el total estimado, y avisa si el hotel no tiene disponibilidad en las fechas del vuelo.
4. **Página 404** para rutas inexistentes.

### Manejo de errores y estados

- Mensajes de **carga** mientras se esperan las respuestas.
- Mensajes de **error** claros (servidor caído, error 404, errores de GraphQL, falla de red) con botón **Reintentar** cuando corresponde.
- **Estados vacíos**: sin resultados de búsqueda, destino sin vuelos u hoteles.
- **Disponibilidad**: las opciones agotadas aparecen deshabilitadas y no se pueden elegir.

### Probar los errores (backend mock)

Abre la consola del navegador (F12), ejecuta uno de estos comandos y recarga la página:

```js
sessionStorage.setItem('mock-fallo', 'rest')     // la API REST responde error 500
sessionStorage.setItem('mock-fallo', 'graphql')  // la API GraphQL responde con errors
sessionStorage.setItem('mock-fallo', 'red')      // simula caída de red en ambas APIs
sessionStorage.removeItem('mock-fallo')          // vuelve al funcionamiento normal
```

También se puede entrar a un destino que no existe, por ejemplo `#/destinos/999`.

## Cumplimiento de la pauta de evaluación

| N° | Criterio | Dónde se cumple |
| --- | --- | --- |
| 1 | Interfaz gráfica funcional y diseño responsivo | Tailwind con breakpoints `sm:`, `md:` y `lg:`: grillas de 1 a 3 columnas, menú hamburguesa en móvil (`Navbar.jsx`), resumen del viaje fijo en escritorio y debajo en móvil (`ResumenViaje.jsx`). |
| 2 | API REST mock: obtención y visualización de datos | `src/mocks/handlers.js` (`GET /api/destinos` y `GET /api/destinos/:id`), `src/services/api.js` (fetch con manejo de errores), `pages/Destinos.jsx` y `components/DestinoCard.jsx`. |
| 3 | API GraphQL mock: consulta de información detallada | `src/mocks/handlers.js` (`query ObtenerOpcionesDestino`), `src/graphql/queries.js`, `src/graphql/client.js` (Apollo Client) y `useQuery` en `pages/DestinoDetalle.jsx` (vuelos y hoteles con precios, fechas y disponibilidad). |
| 4 | React Router: navegación fluida | `src/main.jsx` (`HashRouter`) y `src/App.jsx` (`Routes`/`Route`): `/`, `/destinos`, `/destinos/:id` (`useParams`) y `*` (404). Navegación con `Link` y `NavLink` (enlace activo resaltado). |
| 5 | Código modular y reutilizable | Carpetas `components/`, `pages/`, `services/`, `graphql/`, `mocks/`, `utils/`. Componentes reutilizados: `Loading`, `ErrorMessage`, `Disponibilidad` (en vuelos y hoteles), `DestinoCard`, `VueloCard`, `HotelCard`. |
| 6 | Manejo de estado con `useState` y `useEffect` | `useState`: datos, carga, error y reintentos (`Destinos.jsx`, `DestinoDetalle.jsx`), filtros de búsqueda y continente, vuelo y hotel elegidos, menú móvil (`Navbar.jsx`). `useEffect`: carga de datos REST con cancelación (`AbortController`), recarga al cambiar de destino o al reintentar, y título de la pestaña por página. |
| 7 | Publicación en GitHub con documentación y gh-pages | Este README, `.gitignore`, script `npm run deploy` (paquete `gh-pages`) y `base: './'` + `HashRouter` para que funcione en GitHub Pages. |
| 8 | Pruebas en distintos navegadores | Ver la sección "Pruebas realizadas". |

## Estructura del proyecto

```
index.html                  # página principal (punto de entrada de Vite)
vite.config.js              # configuración de Vite (base './' para GitHub Pages)
tailwind.config.js          # colores de la marca y rutas de contenido
postcss.config.js           # Tailwind + Autoprefixer
public/
  mockServiceWorker.js      # generado con "npx msw init public"
src/
  main.jsx                  # inicia MSW, Apollo y React Router
  App.jsx                   # rutas de la aplicación
  index.css                 # directivas de Tailwind y clases de botones (@layer components)
  components/               # componentes reutilizables (Navbar, DestinoCard, VueloCard, HotelCard, ...)
  pages/                    # páginas (Home, Destinos, DestinoDetalle, NotFound)
  services/api.js           # llamadas a la API REST
  graphql/                  # cliente de Apollo y query GraphQL
  mocks/                    # backend mock: datos (data.js) y handlers REST + GraphQL
  utils/                    # formato de precios/fechas, mensajes de error (con pruebas)
```

## Publicación en GitHub Pages

1. Crear el repositorio `viajes-renato-aravena-PFY2202` en GitHub y subir el código:
   ```bash
   git init
   git add .
   git commit -m "Proyecto agencia de viajes"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/viajes-renato-aravena-PFY2202.git
   git push -u origin main
   ```
2. Publicar el sitio: `npm run deploy` (crea la rama `gh-pages` con el contenido de `dist`).
3. En GitHub: *Settings → Pages* y comprobar que la fuente sea la rama `gh-pages` (carpeta `/ (root)`).
4. Compartir la URL del repositorio con el docente.

El proyecto usa `base: './'` en `vite.config.js` y `HashRouter`, por lo que funciona en cualquier ruta de GitHub Pages, incluso al recargar la página.

## Pruebas realizadas

- Pruebas unitarias con Vitest (`npm test`) de las funciones de formato de precios y fechas, cálculo de noches y rangos de fechas.
- Pruebas manuales/automatizadas del flujo completo: listar destinos (REST), filtrar, elegir destino, ver vuelos y hoteles (GraphQL), seleccionar opciones y revisar el resumen, navegación y recarga de rutas, página 404.
- Pruebas de errores: destino inexistente, error 500 de REST, error de GraphQL, caída de red, reintentos.
- Pruebas en modo desarrollo (`npm run dev`) y sobre el build publicado en una subcarpeta, igual que GitHub Pages.
- Pruebas de responsividad en 375 px (móvil), 768 px (tablet) y 1440 px (escritorio), sin scroll horizontal.
- Navegador probado automáticamente: Chromium (motor de Chrome y Edge), sin errores ni advertencias en la consola.
- Checklist para revisar manualmente en otros navegadores (Firefox, Edge, Safari):
  - [ ] Se cargan los destinos y funcionan la búsqueda y el filtro.
  - [ ] Al entrar a un destino se ven sus vuelos y hoteles.
  - [ ] Se puede elegir vuelo y hotel y el total se calcula bien.
  - [ ] Los botones atrás/adelante del navegador y recargar la página funcionan.
  - [ ] Los mensajes de error aparecen al simular fallas (ver "Probar los errores").
  - [ ] La vista móvil (F12 → modo dispositivo) se ve bien y el menú abre y cierra.

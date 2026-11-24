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

## Cómo funciona el código

### Recorrido general

1. Al abrir la página, `main.jsx` inicia el backend mock (MSW) y después dibuja la aplicación.
2. `App.jsx` decide qué página mostrar según la ruta (`/`, `/destinos`, `/destinos/:id`).
3. La página de destinos pide la lista a la API REST (`GET /api/destinos`).
4. Al elegir un destino se pide su información por REST (`GET /api/destinos/:id`) y, cuando llega, se consultan sus vuelos y hoteles por GraphQL.
5. El usuario elige un vuelo y un hotel y el resumen calcula el total.

En todos los casos las peticiones salen del navegador como si hubiera un servidor real, pero MSW las intercepta y responde con los datos de `src/mocks/data.js`.

### 1. Arranque (`src/main.jsx`)

Primero se inicia el service worker de MSW y recién después se renderiza React. Así la primera petición ya queda interceptada por el mock:

```js
await worker.start({
  serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  onUnhandledRequest: 'bypass',
});
```

Si el mock no logra iniciar, el error se muestra en consola y la app se dibuja igual (las páginas mostrarán el mensaje de error de conexión).

Luego la aplicación se envuelve en dos proveedores:

- `ApolloProvider`: deja disponible el cliente de GraphQL para usar `useQuery` en cualquier componente.
- `HashRouter`: maneja la navegación. Se usa la versión con `#` en la URL (por ejemplo `#/destinos/3`) porque GitHub Pages no sabe redirigir rutas como `/destinos/3` a `index.html`, y sin esto la página daría 404 al recargar.

### 2. Rutas (`src/App.jsx`)

`App` arma el esqueleto que se repite en todas las páginas (`Navbar`, contenido y `Footer`) y define las rutas:

| Ruta | Página |
| --- | --- |
| `/` | `Home` |
| `/destinos` | `Destinos` |
| `/destinos/:id` | `DestinoDetalle` (el `id` se lee con `useParams`) |
| `*` | `NotFound` (cualquier otra ruta) |

En `Navbar.jsx` los enlaces usan `NavLink`, que indica si la ruta está activa para resaltar el enlace de la página actual. En pantallas chicas el menú se abre y cierra con el estado `menuAbierto`.

### 3. Backend mock (`src/mocks/`)

- `data.js`: los datos de prueba. Un arreglo `destinos` (nombre, país, continente, descripción, actividades y un color) y un objeto `opcionesPorDestino` con los vuelos y hoteles de cada destino, usando el id del destino como clave.
- `handlers.js`: define qué responde cada petición.
  - `GET /api/destinos` devuelve la lista completa.
  - `GET /api/destinos/:id` devuelve un destino, o un error 404 con un mensaje si no existe.
  - `query ObtenerOpcionesDestino` (GraphQL) devuelve los vuelos y hoteles del destino pedido, o un arreglo `errors` si falta el id o no existe.
  - Cada respuesta espera unos milisegundos con `delay()` para simular la demora de un servidor real y poder ver los mensajes de carga.
  - Antes de responder se revisa `sessionStorage.getItem('mock-fallo')` para simular fallas (ver "Probar los errores").
- `browser.js`: crea el service worker con esos handlers (`setupWorker(...handlers)`).

### 4. Consumo de la API REST

`src/services/api.js` tiene la función `pedirJson`, que usan `obtenerDestinos()` y `obtenerDestino(id)`. Hace el `fetch` y transforma cualquier problema en un error con un mensaje entendible:

- Si no hay conexión, se lanza "No se pudo conectar con el servidor...".
- Si la respuesta no es `ok` (por ejemplo 404 o 500), se usa el `mensaje` que manda el servidor y se guarda el código en `error.status`.
- Si la respuesta no es JSON válido, se avisa que el formato no es válido.

En `src/pages/Destinos.jsx` se usa así:

```js
useEffect(() => {
  const controlador = new AbortController();
  async function cargarDestinos() {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerDestinos(controlador.signal);
      if (!Array.isArray(datos)) {
        throw new Error('La respuesta del servidor no tiene el formato esperado.');
      }
      setDestinos(datos);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      if (!controlador.signal.aborted) setCargando(false);
    }
  }
  cargarDestinos();
  return () => controlador.abort();
}, [intento]);
```

- `cargando`, `error` y `destinos` son estados (`useState`) que deciden qué se ve: el componente `Loading`, el `ErrorMessage` o la grilla de tarjetas.
- El `AbortController` cancela la petición si el usuario se va de la página antes de que termine, para no actualizar un componente que ya no existe.
- El botón "Reintentar" suma 1 a `intento`. Como `intento` está en las dependencias del `useEffect`, la carga se vuelve a ejecutar.
- La búsqueda y el filtro por continente son otros dos estados (`busqueda` y `continente`). La lista filtrada no se guarda en un estado aparte: se calcula en cada render a partir de `destinos`, y la lista de continentes del `<select>` se arma con los continentes que vienen en los datos.

Cada destino se dibuja con el componente `DestinoCard`, que tiene un `Link` a `/destinos/:id`.

### 5. Consumo de la API GraphQL

- `src/graphql/client.js` crea el `ApolloClient` apuntando a `/graphql` (que MSW intercepta) con una caché en memoria (`InMemoryCache`).
- `src/graphql/queries.js` define la consulta `ObtenerOpcionesDestino`. Recibe `destinoId` y pide solo los campos que la interfaz muestra: aerolínea, fechas, duración, escalas, precio y asientos de cada vuelo, y nombre, estrellas, ubicación, precio por noche, fechas y habitaciones de cada hotel.

En `src/pages/DestinoDetalle.jsx` se combinan las dos APIs:

1. Con `useParams` se obtiene el `id` de la URL.
2. Un `useEffect` con dependencias `[id, intento]` carga el destino por REST (igual que en la lista). Al cambiar de destino también se limpia el vuelo y el hotel elegidos.
3. Cuando el destino ya llegó, `useQuery` consulta los vuelos y hoteles:

```js
const {
  data,
  loading: cargandoOpciones,
  error: errorOpciones,
  refetch,
} = useQuery(OBTENER_OPCIONES_DESTINO, {
  variables: { destinoId: id },
  skip: !destino || String(destino.id) !== id,
  notifyOnNetworkStatusChange: true,
});
```

`skip` evita consultar GraphQL mientras el destino no esté cargado o si falló. `cargandoOpciones` y `errorOpciones` muestran los mismos componentes `Loading` y `ErrorMessage`, y el botón "Reintentar" llama a `refetch()`. El mensaje de error se arma con `mensajeErrorGraphQL` (`src/utils/errores.js`), que distingue entre un error de red y un error devuelto en el campo `errors` de GraphQL.

Si el destino no existe (404) no se muestra el botón "Reintentar", porque volver a pedirlo daría el mismo resultado.

### 6. Selección del viaje y resumen

- `DestinoDetalle` guarda el vuelo y el hotel elegidos en `vueloElegido` y `hotelElegido`. Al hacer clic en una opción ya elegida, se quita (`alternarVuelo` / `alternarHotel`).
- `VueloCard` y `HotelCard` reciben la opción, si está seleccionada y la función `onSeleccionar`. Si no quedan cupos, el botón queda deshabilitado.
- `Disponibilidad` muestra la etiqueta de cupos: "Agotado" si es 0, "Quedan N" si quedan 3 o menos, y "N disponibles" en otro caso. Se usa tanto para asientos como para habitaciones.
- `ResumenViaje` hace los cálculos:
  - Noches = días entre la salida y el regreso del vuelo (`calcularNoches`).
  - Total del hotel = precio por noche × noches.
  - Total estimado = precio del vuelo + total del hotel.
  - Si las fechas del vuelo no caen dentro de las fechas disponibles del hotel (`rangoDentroDe`), aparece un aviso.

Las funciones de `src/utils/formato.js` dan formato a los precios en pesos chilenos (`$689.000`) y a las fechas (`10 ene 2027`). Las fechas se leen en UTC para que no cambien de día según la zona horaria del computador. Estas funciones tienen pruebas en `formato.test.js`.

### 7. Estilos

Los estilos se hacen con clases de Tailwind directamente en cada componente. Los colores propios del sitio (`primario` y `acento`) están en `tailwind.config.js`, y las clases de botones que se repiten (`boton`, `boton-primario`, `boton-secundario`, `boton-acento`) están en `src/index.css` con `@layer components`. Para el diseño responsivo se usan los prefijos `sm:`, `md:` y `lg:`; por ejemplo, la grilla de destinos pasa de 1 columna en móvil a 2 en tablet y 3 en escritorio.

## Pruebas realizadas

- Pruebas unitarias con Vitest (`npm test`) para el formato de precios y fechas, el cálculo de noches y los rangos de fechas.
- Flujo completo: listar y filtrar destinos, entrar a uno, ver sus vuelos y hoteles, elegir opciones y revisar el total.
- Errores: destino inexistente, error del servidor REST, error de GraphQL y caída de red.
- Vista en móvil (375 px), tablet (768 px) y escritorio.

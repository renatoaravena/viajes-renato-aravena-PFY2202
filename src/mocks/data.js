// Datos de ejemplo que usa el backend mock (MSW).
// Los precios están en pesos chilenos (CLP) y las fechas en formato ISO (AAAA-MM-DD).

export const destinos = [
  {
    id: 1,
    nombre: 'Cancún',
    pais: 'México',
    continente: 'América',
    color: '#0891b2',
    descripcion: 'Playas de arena blanca y aguas turquesa en el Caribe mexicano.',
    actividades: ['Snorkel en Isla Mujeres', 'Ruinas de Chichén Itzá', 'Cenotes', 'Playa Delfines'],
  },
  {
    id: 2,
    nombre: 'París',
    pais: 'Francia',
    continente: 'Europa',
    color: '#7c3aed',
    descripcion: 'La ciudad de la luz: arte, gastronomía e historia en cada esquina.',
    actividades: ['Torre Eiffel', 'Museo del Louvre', 'Paseo en el Sena', 'Barrio de Montmartre'],
  },
  {
    id: 3,
    nombre: 'Tokio',
    pais: 'Japón',
    continente: 'Asia',
    color: '#e11d48',
    descripcion: 'Tradición milenaria y tecnología de vanguardia en una sola metrópolis.',
    actividades: ['Templo Senso-ji', 'Cruce de Shibuya', 'Mercado de Tsukiji', 'Monte Fuji (excursión)'],
  },
  {
    id: 4,
    nombre: 'Nueva York',
    pais: 'Estados Unidos',
    continente: 'América',
    color: '#2563eb',
    descripcion: 'La ciudad que nunca duerme, con teatros, museos y rascacielos.',
    actividades: ['Estatua de la Libertad', 'Central Park', 'Times Square', 'Musicales en Broadway'],
  },
  {
    id: 5,
    nombre: 'Roma',
    pais: 'Italia',
    continente: 'Europa',
    color: '#d97706',
    descripcion: 'Una ciudad museo donde el Imperio Romano convive con la vida moderna.',
    actividades: ['Coliseo Romano', 'Fontana di Trevi', 'Ciudad del Vaticano', 'Tour gastronómico'],
  },
  {
    id: 6,
    nombre: 'Cusco',
    pais: 'Perú',
    continente: 'América',
    color: '#16a34a',
    descripcion: 'Antigua capital del Imperio Inca, puerta de entrada a Machu Picchu.',
    actividades: ['Machu Picchu', 'Valle Sagrado', 'Montaña de Colores', 'Sacsayhuamán'],
  },
  {
    id: 7,
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    continente: 'América',
    color: '#ea580c',
    descripcion: 'Playas famosas, samba y vistas espectaculares desde el Corcovado.',
    actividades: ['Cristo Redentor', 'Pan de Azúcar', 'Playa de Copacabana', 'Escuela de samba'],
  },
  {
    id: 8,
    nombre: 'Isla de Pascua',
    pais: 'Chile',
    continente: 'Oceanía',
    color: '#0d9488',
    descripcion: 'Rapa Nui, la isla de los moáis, uno de los lugares más remotos del planeta.',
    actividades: ['Moáis de Rano Raraku', 'Ahu Tongariki', 'Cráter Rano Kau', 'Playa Anakena'],
  },
];

// Vuelos y hoteles por destino (la clave es el id del destino).
// Notas de los datos de prueba:
//  - Algunas opciones tienen 0 cupos para probar el estado "Agotado".
//  - Isla de Pascua (8) no tiene hoteles publicados para probar el estado vacío.
export const opcionesPorDestino = {
  1: {
    vuelos: [
      { id: 'v-1-1', aerolinea: 'LATAM', origen: 'Santiago (SCL)', fechaSalida: '2027-01-10', fechaRegreso: '2027-01-17', duracion: '9 h 45 min', escalas: 1, precio: 689000, asientosDisponibles: 14 },
      { id: 'v-1-2', aerolinea: 'Avianca', origen: 'Santiago (SCL)', fechaSalida: '2027-01-24', fechaRegreso: '2027-02-02', duracion: '11 h 20 min', escalas: 1, precio: 642000, asientosDisponibles: 3 },
      { id: 'v-1-3', aerolinea: 'Sky Airline', origen: 'Santiago (SCL)', fechaSalida: '2027-02-14', fechaRegreso: '2027-02-21', duracion: '10 h 05 min', escalas: 1, precio: 598000, asientosDisponibles: 0 },
    ],
    hoteles: [
      { id: 'h-1-1', nombre: 'Hotel Playa Azul', estrellas: 4, ubicacion: 'Zona Hotelera', precioPorNoche: 98000, fechaDesde: '2027-01-05', fechaHasta: '2027-02-28', habitacionesDisponibles: 8 },
      { id: 'h-1-2', nombre: 'Hostal Caribe Mío', estrellas: 3, ubicacion: 'Centro de Cancún', precioPorNoche: 45000, fechaDesde: '2027-01-05', fechaHasta: '2027-02-28', habitacionesDisponibles: 2 },
      { id: 'h-1-3', nombre: 'Gran Resort Maya', estrellas: 5, ubicacion: 'Playa Delfines', precioPorNoche: 185000, fechaDesde: '2027-01-05', fechaHasta: '2027-02-28', habitacionesDisponibles: 0 },
    ],
  },
  2: {
    vuelos: [
      { id: 'v-2-1', aerolinea: 'Air France', origen: 'Santiago (SCL)', fechaSalida: '2027-03-05', fechaRegreso: '2027-03-15', duracion: '14 h 30 min', escalas: 0, precio: 1180000, asientosDisponibles: 9 },
      { id: 'v-2-2', aerolinea: 'Iberia', origen: 'Santiago (SCL)', fechaSalida: '2027-04-02', fechaRegreso: '2027-04-12', duracion: '16 h 10 min', escalas: 1, precio: 1045000, asientosDisponibles: 22 },
    ],
    hoteles: [
      { id: 'h-2-1', nombre: 'Hôtel Le Marais', estrellas: 4, ubicacion: 'Le Marais', precioPorNoche: 142000, fechaDesde: '2027-03-01', fechaHasta: '2027-04-30', habitacionesDisponibles: 5 },
      { id: 'h-2-2', nombre: 'Hôtel Montmartre Charme', estrellas: 3, ubicacion: 'Montmartre', precioPorNoche: 96000, fechaDesde: '2027-03-01', fechaHasta: '2027-04-30', habitacionesDisponibles: 11 },
      { id: 'h-2-3', nombre: 'Le Grand Louvre', estrellas: 5, ubicacion: 'Primer distrito', precioPorNoche: 320000, fechaDesde: '2027-03-10', fechaHasta: '2027-04-20', habitacionesDisponibles: 1 },
    ],
  },
  3: {
    vuelos: [
      { id: 'v-3-1', aerolinea: 'Japan Airlines', origen: 'Santiago (SCL)', fechaSalida: '2027-04-03', fechaRegreso: '2027-04-17', duracion: '27 h 40 min', escalas: 2, precio: 1520000, asientosDisponibles: 6 },
      { id: 'v-3-2', aerolinea: 'Qatar Airways', origen: 'Santiago (SCL)', fechaSalida: '2027-05-08', fechaRegreso: '2027-05-22', duracion: '31 h 15 min', escalas: 2, precio: 1395000, asientosDisponibles: 17 },
      { id: 'v-3-3', aerolinea: 'Air Canada', origen: 'Santiago (SCL)', fechaSalida: '2027-06-05', fechaRegreso: '2027-06-19', duracion: '29 h 00 min', escalas: 2, precio: 1460000, asientosDisponibles: 2 },
    ],
    hoteles: [
      { id: 'h-3-1', nombre: 'Shinjuku Sakura Hotel', estrellas: 4, ubicacion: 'Shinjuku', precioPorNoche: 110000, fechaDesde: '2027-04-01', fechaHasta: '2027-06-30', habitacionesDisponibles: 12 },
      { id: 'h-3-2', nombre: 'Asakusa Ryokan Kaede', estrellas: 3, ubicacion: 'Asakusa', precioPorNoche: 78000, fechaDesde: '2027-04-01', fechaHasta: '2027-06-30', habitacionesDisponibles: 4 },
    ],
  },
  4: {
    vuelos: [
      { id: 'v-4-1', aerolinea: 'American Airlines', origen: 'Santiago (SCL)', fechaSalida: '2027-02-06', fechaRegreso: '2027-02-14', duracion: '13 h 50 min', escalas: 1, precio: 845000, asientosDisponibles: 18 },
      { id: 'v-4-2', aerolinea: 'LATAM', origen: 'Santiago (SCL)', fechaSalida: '2027-03-13', fechaRegreso: '2027-03-21', duracion: '12 h 40 min', escalas: 1, precio: 879000, asientosDisponibles: 7 },
      { id: 'v-4-3', aerolinea: 'Delta', origen: 'Santiago (SCL)', fechaSalida: '2027-04-10', fechaRegreso: '2027-04-18', duracion: '14 h 05 min', escalas: 1, precio: 812000, asientosDisponibles: 0 },
    ],
    hoteles: [
      { id: 'h-4-1', nombre: 'Midtown Central Hotel', estrellas: 4, ubicacion: 'Midtown Manhattan', precioPorNoche: 175000, fechaDesde: '2027-02-01', fechaHasta: '2027-04-30', habitacionesDisponibles: 6 },
      { id: 'h-4-2', nombre: 'Brooklyn Bridge Inn', estrellas: 3, ubicacion: 'Brooklyn', precioPorNoche: 110000, fechaDesde: '2027-02-01', fechaHasta: '2027-04-30', habitacionesDisponibles: 15 },
    ],
  },
  5: {
    vuelos: [
      { id: 'v-5-1', aerolinea: 'ITA Airways', origen: 'Santiago (SCL)', fechaSalida: '2027-05-01', fechaRegreso: '2027-05-11', duracion: '15 h 20 min', escalas: 1, precio: 1090000, asientosDisponibles: 12 },
      { id: 'v-5-2', aerolinea: 'Iberia', origen: 'Santiago (SCL)', fechaSalida: '2027-06-12', fechaRegreso: '2027-06-22', duracion: '17 h 00 min', escalas: 1, precio: 1015000, asientosDisponibles: 4 },
    ],
    hoteles: [
      { id: 'h-5-1', nombre: 'Hotel Fori Imperiali', estrellas: 4, ubicacion: 'Cerca del Coliseo', precioPorNoche: 128000, fechaDesde: '2027-05-01', fechaHasta: '2027-06-30', habitacionesDisponibles: 9 },
      { id: 'h-5-2', nombre: 'Pensione Trastevere', estrellas: 3, ubicacion: 'Trastevere', precioPorNoche: 82000, fechaDesde: '2027-05-01', fechaHasta: '2027-06-30', habitacionesDisponibles: 3 },
      { id: 'h-5-3', nombre: 'Palazzo Vaticano', estrellas: 5, ubicacion: 'Prati', precioPorNoche: 260000, fechaDesde: '2027-05-01', fechaHasta: '2027-06-30', habitacionesDisponibles: 0 },
    ],
  },
  6: {
    vuelos: [
      { id: 'v-6-1', aerolinea: 'LATAM', origen: 'Santiago (SCL)', fechaSalida: '2027-01-15', fechaRegreso: '2027-01-21', duracion: '5 h 10 min', escalas: 1, precio: 265000, asientosDisponibles: 20 },
      { id: 'v-6-2', aerolinea: 'Sky Airline', origen: 'Santiago (SCL)', fechaSalida: '2027-03-19', fechaRegreso: '2027-03-26', duracion: '4 h 55 min', escalas: 1, precio: 238000, asientosDisponibles: 5 },
    ],
    hoteles: [
      { id: 'h-6-1', nombre: 'Casa Inca Boutique', estrellas: 4, ubicacion: 'Plaza de Armas', precioPorNoche: 72000, fechaDesde: '2027-01-10', fechaHasta: '2027-04-15', habitacionesDisponibles: 7 },
      { id: 'h-6-2', nombre: 'Hostal Valle Sagrado', estrellas: 3, ubicacion: 'San Blas', precioPorNoche: 38000, fechaDesde: '2027-01-10', fechaHasta: '2027-04-15', habitacionesDisponibles: 10 },
    ],
  },
  7: {
    vuelos: [
      { id: 'v-7-1', aerolinea: 'LATAM', origen: 'Santiago (SCL)', fechaSalida: '2027-01-30', fechaRegreso: '2027-02-06', duracion: '4 h 35 min', escalas: 0, precio: 395000, asientosDisponibles: 11 },
      { id: 'v-7-2', aerolinea: 'GOL', origen: 'Santiago (SCL)', fechaSalida: '2027-02-20', fechaRegreso: '2027-02-27', duracion: '6 h 50 min', escalas: 1, precio: 352000, asientosDisponibles: 1 },
    ],
    hoteles: [
      { id: 'h-7-1', nombre: 'Copacabana Palace Vista', estrellas: 5, ubicacion: 'Copacabana', precioPorNoche: 210000, fechaDesde: '2027-01-25', fechaHasta: '2027-03-10', habitacionesDisponibles: 2 },
      { id: 'h-7-2', nombre: 'Ipanema Beach Hostel', estrellas: 3, ubicacion: 'Ipanema', precioPorNoche: 52000, fechaDesde: '2027-01-25', fechaHasta: '2027-03-10', habitacionesDisponibles: 14 },
    ],
  },
  8: {
    vuelos: [
      { id: 'v-8-1', aerolinea: 'LATAM', origen: 'Santiago (SCL)', fechaSalida: '2027-02-12', fechaRegreso: '2027-02-19', duracion: '5 h 30 min', escalas: 0, precio: 640000, asientosDisponibles: 0 },
      { id: 'v-8-2', aerolinea: 'LATAM', origen: 'Santiago (SCL)', fechaSalida: '2027-03-12', fechaRegreso: '2027-03-19', duracion: '5 h 30 min', escalas: 0, precio: 615000, asientosDisponibles: 8 },
    ],
    hoteles: [],
  },
};

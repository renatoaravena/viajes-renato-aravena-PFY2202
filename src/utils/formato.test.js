import {
  formatearPrecio,
  formatearFecha,
  calcularNoches,
  rangoDentroDe,
  textoEscalas,
} from './formato';

// Intl usa espacios no separables en algunos formatos: se normalizan para comparar.
const normalizar = (texto) => texto.replace(/\s/g, ' ');

describe('formatearPrecio', () => {
  test('formatea en pesos chilenos con separador de miles', () => {
    expect(normalizar(formatearPrecio(689000))).toBe('$689.000');
  });
});

describe('formatearFecha', () => {
  test('muestra día, mes abreviado y año sin desfase de zona horaria', () => {
    expect(normalizar(formatearFecha('2027-01-10'))).toMatch(/^10 ene\.? 2027$/);
  });

  test('si la fecha es inválida devuelve el texto original', () => {
    expect(formatearFecha('no-es-fecha')).toBe('no-es-fecha');
  });
});

describe('calcularNoches', () => {
  test('calcula las noches entre dos fechas', () => {
    expect(calcularNoches('2027-01-10', '2027-01-17')).toBe(7);
  });

  test('funciona al cruzar de mes', () => {
    expect(calcularNoches('2027-01-24', '2027-02-02')).toBe(9);
  });

  test('devuelve 0 si las fechas son inválidas o están invertidas', () => {
    expect(calcularNoches('2027-01-17', '2027-01-10')).toBe(0);
    expect(calcularNoches('x', '2027-01-10')).toBe(0);
  });
});

describe('rangoDentroDe', () => {
  test('true cuando el rango está contenido', () => {
    expect(rangoDentroDe('2027-01-10', '2027-01-17', '2027-01-05', '2027-02-28')).toBe(true);
  });

  test('false cuando se sale del rango', () => {
    expect(rangoDentroDe('2027-01-01', '2027-01-17', '2027-01-05', '2027-02-28')).toBe(false);
    expect(rangoDentroDe('2027-02-20', '2027-03-02', '2027-01-05', '2027-02-28')).toBe(false);
  });
});

describe('textoEscalas', () => {
  test('describe las escalas', () => {
    expect(textoEscalas(0)).toBe('Directo');
    expect(textoEscalas(1)).toBe('1 escala');
    expect(textoEscalas(2)).toBe('2 escalas');
  });
});

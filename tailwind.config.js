/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Colores de la marca
        primario: {
          DEFAULT: '#0e7490',
          oscuro: '#0b3a4a',
          claro: '#e0f2f7',
        },
        acento: {
          DEFAULT: '#f97316',
          claro: '#fb923c',
        },
      },
    },
  },
  plugins: [],
};

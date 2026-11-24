import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Service Worker que intercepta las llamadas REST y GraphQL en el navegador.
export const worker = setupWorker(...handlers);

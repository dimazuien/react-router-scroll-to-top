import '@testing-library/jest-dom';

import { TextEncoder } from 'node:util';

Object.defineProperty(window, 'scrollTo', { value: () => {} });

// React Router 7 uses TextEncoder, which Jest's jsdom environment lacks.
Object.assign(globalThis, { TextEncoder });

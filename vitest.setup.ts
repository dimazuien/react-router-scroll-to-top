import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement scrolling, and logs an error for every call.
Object.defineProperty(globalThis, 'scrollTo', {
  writable: true,
  value: () => undefined,
});

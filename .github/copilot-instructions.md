# GitHub Copilot Instructions

## Project Overview

This is a React component library that provides scroll-to-top functionality for React Router applications. The library exports a `ScrollToTop` component that automatically scrolls to the top of the page when the route changes.

## Technologies & Dependencies

- **Package manager**: npm
- **Language**: TypeScript
- **Framework**: React (hooks-based)
- **Router**: React Router for location change detection
- **Build**: Webpack + npm-dts for type definitions
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint with Airbnb config + TypeScript rules
- **Formatting**: Prettier
- **CI/CD**: Semantic Release with conventional commits, CircleCI for the main flow, GitHub Actions for code scanning and security

## Project Structure

```
src/
├── index.ts                   # Main export file
├── ScrollToTop/
│   ├── index.ts               # Component implementation
│   └── index.test.tsx         # Component tests
├── useScrollToTop/
│   ├── index.ts               # Hook implementation
│   └── index.test.tsx         # Hook tests
└── setupTests.ts              # Jest setup
```

## Coding Conventions

- Use modern ES6+ syntax
- Use functional components with hooks
- Prefer arrow functions for components
- Use folder-based modules with index files for clean imports
- Keep main implementation and tests in the same folder
- Update documentation in the `docs` directory and `README.md` if necessary
- Use destructuring for props and imports
- Follow React hooks rules, best practices, and common conventions

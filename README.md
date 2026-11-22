# Coin Tracker

A web app for tracking cryptocurrency prices, built with React and Vite.

> **Status:** early development. The project has been set up with its tools and libraries, but the app itself hasn't been built yet.

## Tech stack

- [React 19](https://react.dev): UI
- [Vite](https://vite.dev): dev server and build tool
- [Tailwind CSS v4](https://tailwindcss.com): styling, through the `@tailwindcss/vite` plugin
- [Redux](https://redux.js.org) + [React Redux](https://react-redux.js.org): app state
- [React Router](https://reactrouter.com): routing between pages
- [ESLint](https://eslint.org): linting

## Getting started

You need [Node.js](https://nodejs.org) and npm installed.

```bash
npm install
npm run dev
```

Then open the local URL that Vite prints (usually http://localhost:5173).

## Scripts

| Command           | What it does                                 |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Starts the dev server with hot reload        |
| `npm run build`   | Builds the app for production into `dist/`   |
| `npm run preview` | Serves the production build locally          |
| `npm run lint`    | Checks the code with ESLint                  |

## Project structure

```
public/          Static files served as-is (favicon, icons)
src/
  main.jsx       App entry point; mounts <App /> into #root
  index.css      Global styles and the Tailwind import
  assets/        Images imported from code
index.html       HTML shell loaded by Vite
vite.config.js   Vite config (React + Tailwind plugins)
```

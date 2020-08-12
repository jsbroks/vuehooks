<p align="center">
    <img src="https://raw.githubusercontent.com/datatorch/documentation/master/docs/.vuepress/public/vuehooks.png" width="500" />
</p>

<h1 align="center">
  VueHooks
</h1>
<h4 align="center">Collection of utility composition functions for Vue</h4>

<p align="center">
<a href="https://www.npmjs.com/package/@vuehooks/core" target="__blank">
<img src="https://img.shields.io/npm/v/@vuehooks/core?color=1abc9c" alt="NPM version" /></a>
<a href="https://www.npmjs.com/package/@vuehooks" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vuehooks/core?color=34495e"/></a>
<a href="https://github.com/datatorch/vuehooks" target="__blank"><img src="https://img.shields.io/github/last-commit/datatorch/vuehooks.svg?color=9b59b6" alt="GitHub last commit" /></a>
<a href="https://github.com/datatorch/vuehooks/issues" target="__blank"><img src="https://img.shields.io/github/issues/datatorch/vuehooks.svg?color=3498db" alt="GitHub issues" /></a>
<a href='https://coveralls.io/github/datatorch/vuehooks?branch=master'><img src='https://coveralls.io/repos/github/datatorch/vuehooks/badge.svg?branch=master' alt='Coverage Status' /></a>
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/datatorch/vuehooks/Tests?color=2ecc71">
</p>

<br />

## :rocket: Features

- **20+ composition functions** with more to come!
- **Bundler-friendly** only imports the functions you need.
- **Well-documented** and typed interfaces.
- **Zero-config** server-side rendering capability.
- **Self-contained** with no dependencies.
- **Backed by a team** using VueHooks in production.
- **Additional addons** such as vue-router, timeago, query, etc.

<br />

## :earth_americas: Ecosystem

<!-- omit in toc -->

- [@vuehooks/core](#vuehookscore) - Collection of common hooks.
- [@vuehooks/query](#vuehooksquery) - Hooks for fetching, caching and updating
  asynchronous data.
- [@vuehooks/router](#vuehooksrouter) - Hooks for make using VueRouter easier.

<br />

## :fire: Functions

### [`@vuehooks/core`](https://www.npmjs.com/package/@vuehooks/core)

- **Animations**
  - `useTimeout` — change variables state after a timeout.
  - `useTimeoutFn` — call a function after a timeout.
- **Browser**
  - `useEventListener` — add event listeners to dom with ease.
  - `useEventListenerElement` — add event listeners to element with ease.
  - `useMediaQuery` — track the results of a media query programmatically.
- **Sensors**
  - `useLongPress` — track long press gestures.
  - `usePrint` — track if user is printing.
  - `useMouse` — track mouse position.
  - `useMouseElement` — track mouse position in element.
  - `useWindowSize` — track with and height of window.
  - `useResizeObserver` — track the width and height of an element using
    [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
- **State**
  - `createGlobalState` — create state accessible in any component.
  - `useClamp` — track state of a clamped number.
  - `useCounter` — track state of a number.
  - `useHover` — track if an element is being hovered over.
  - `useToggle` — track state of a boolean.
- **Emitter**
  - `createEmitter` — create an emitter for an event bus.
  - `useEventOn` — add event listeners to emitters.
- **Miscellaneous**
  - `useWorker` — running heavy javascript file without blocking ui.
  - `useWorkerFn` — running heavy task, without blocking ui.

### [`@vuehooks/router`](https://www.npmjs.com/package/@vuehooks/router)

- **Vue Router**
  - `useRouter` — gain easy access to the vue-router.
  - `useQuery` — monitor url queries with one line.
  - `useParam` — monitor url parameters with one line.

### [`@vuehooks/testing`](https://www.npmjs.com/package/@vuehooks/testing)

- **Testing**
  - `renderHook` — render hooks in a component for easy testing.

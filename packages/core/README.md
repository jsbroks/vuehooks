<h1 align="center">
  VueHooks Core
</h1>
<h4 align="center">Collection of essential composition functions for Vue.</h4>

<p align="center">
<a href="https://www.npmjs.com/package/@vuehooks/core" target="__blank">
<img src="https://img.shields.io/npm/v/@vuehooks/core?color=1abc9c" alt="NPM version" /></a>
<a href="https://www.npmjs.com/package/@vuehooks/core" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vuehooks/core?color=34495e"/></a>
</p>

<br>

<h4 align="center">
  <pre>npm i <a href="https://www.npmjs.com/package/@vuehooks/core">@vuehooks/core</a>
  <i>or</i>
  yarn add <a href="https://www.npmjs.com/package/@vuehooks/core">@vuehooks/core</a></pre>
</h2>

<br>

## :rocket: Features

- **Bundler-friendly** only imports the functions you need.
- **Well-documented** and typed interfaces.
- **Zero-config** server-side rendering capability.
- **Self-contained** with no dependencies.

## :fire: Functions

- **Animations**
  - `useTimeout` — change variables state after a timeout.
  - `useTimeoutFn` — call a function after a timeout.
- **Browser**
  - `useLocalStorage` — manages a value in localStorage.
  - `useSessionStorage` — manages a value in sessionStorage.
  - `useClipboard` — copies text to clipboard.
  - `useFullscreen` — display an element fullscreen.
  - `useEventListener` — add event listeners to dom with ease.
  - `useEventListenerElement` — add event listeners to element with ease.
  - `useMediaQuery` — track the results of a media query programmatically.
- **Sensors**
  - `useBattery` — tracks device batter state.
  - `useGeolocation` — tracks geo location state of user's device.
  - `useHover` — track if an element is being hovered over.
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
  - `useToggle` — track state of a boolean.
  - `useMounted` — track if the component is mounted.
- **Emitter**
  - `createEmitter` — create an emitter for an event bus.
  - `useEventOn` — add event listeners to emitters.
- **Miscellaneous**
  - `useWorker` — running heavy javascript file without blocking ui.
  - `useWorkerFn` — running heavy task, without blocking ui.

<!-- <p align="center">
    <img src="https://raw.githubusercontent.com/datatorch/documentation/master/docs/.vuepress/public/circle.png" width="350" />
</p> -->

<h1 align="center">
  VueHooks
</h1>
<h4 align="center">Collection of utility composition functions for Vue</h4>

<br />

## :rocket: Features

- **10+ composition functions** with more to come!
- **Bundler-friendly** only imports the functions you need.
- **Well-documented** and typed interfaces.
- **Zero-config** server-side rendering capability.
- **Self-contained** with no dependencies.
- **Additional addons** such as vue-router, timeago, etc.

<br />

## :earth_americas: Ecosystem

- [@vuehooks/core](#vuehookscore)

- [@vuehooks/router](#vuehooksrouter)

<br />

## :fire: Functions

### [`@vuehooks/core`](https://www.npmjs.com/package/@vuehooks/core)

- **Animations**
  - `useTimeout` — change variables state after a timeout.
  - `useTimeoutFn` — call a function after a timeout.
- **Browser**
  - `useEventListener` — add event listeners to dom with ease.
  - `useMediaQuery` — track the results of a media query programmatically.
- **Sensors**
  - `useLongPress` — track long press gestures.
  - `usePrint` — track if user is printing.
  - `useMouse` — track mouse position.
  - `useMouseElement` — track mouse position in element.
  - `useWindowSize` — track with and height of window.
  - `useResizeObserver` — track the width and height of an element.
- **State**
  - `useToggle` — track state of a boolean.

### [`@vuehooks/router`](https://www.npmjs.com/package/@vuehooks/router)

- **Vue Router**
  - `useRouter` — gain easy access to the vue-router
  - `useQuery` — monitor url queries with on line
  - `useParam` — monitor url parameters with on line

# `@vuehooks/testing`

Simple hooks testing utilities for Vue.

### When to use this library

1. You're writing a library with one or more custom hooks that are not directly
   tied to a component
2. You have a complex hook that is difficult to test through component
   interactions

### When not to use this library

1. Your hook is defined alongside a component and is only used there
2. Your hook is easy to test by just testing the components using it

## Install

```bash
yarn add -D @vuehooks/testing
# or
npm i -D @vuehooks/testing
```

### Peer Dependencies

`@vuehooks/testing` does not come bundled with a version of `vue` or
`@vue/test-utils` to allow you to install the specific version you want to test
against.

## Example

`useCounter.ts`

```js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const inc = (delta: number) => (count.value += delta)
  return { count, inc }
}
```

`useCounter.test.js`

```js
import { renderHook } from '@vuehooks/testing'

import useCounter from './useCounter'

test('should increment counter', () => {
  renderHook(() => {
    const { count, inc } = useCounter()

    inc()

    expect(count.value).toBe(5)
  })
})
```

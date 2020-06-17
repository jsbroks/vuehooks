import { Ref, onMounted, onUnmounted, ref } from '@vue/composition-api'

export function useResizeObserver(target: Ref<HTMLElement>) {
  // const object = document.createElement('object')
  // object.contentDocument?.defaultView?.addEventListener('resize', () => {})

  const width = ref(0)
  const height = ref(0)

  const set = (newWidth: number, newHeight: number) => {
    width.value = newWidth
    height.value = newHeight
  }

  const resizer = new ResizeObserver(entries => {
    if (!Array.isArray(entries)) return

    // Since we only observe the one element, we don't need to loop over the array
    if (!entries.length) return

    const entry = entries[0]

    // `Math.round` is in line with how CSS resolves sub-pixel values
    const newWidth = Math.round(entry.contentRect.width)
    const newHeight = Math.round(entry.contentRect.height)
    set(newWidth, newHeight)
  })

  onMounted(() => resizer.observe(target.value))
  onUnmounted(() => resizer.unobserve(target.value))

  return { width, height }
}

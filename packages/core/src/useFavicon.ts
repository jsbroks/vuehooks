import { onMounted, ref, watch } from '@vue/composition-api'
import { hasWindow } from './utils'
import { MaybeRef } from './utils/typings'

export function useFavicon(href?: MaybeRef<string>) {
  const favicon = ref(href)

  const setFavicon = () => {
    if (!favicon.value) return

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = favicon.value
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  if (hasWindow()) setFavicon()
  onMounted(setFavicon)
  watch(favicon, setFavicon)

  return { favicon }
}

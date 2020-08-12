import { ref } from '@vue/composition-api'
import { useMounted } from './useMounted'
import { MaybeRef } from './utils/typings'

const copyText = (text: string) => {
  const input = document.createElement('textarea')
  input.innerHTML = text
  document.body.appendChild(input)
  input.select()
  var result = document.execCommand('copy')
  document.body.removeChild(input)
  return result
}

export function useClipboard(text?: MaybeRef<string>) {
  const textRef = ref(text ?? '')
  const isMounted = useMounted()

  const supported = ref('clipboard' in navigator)
  const copy = (text?: string) => {
    if (!isMounted) return
    if (text) textRef.value = text
    copyText(textRef.value)
  }

  return { supported, copy, text }
}

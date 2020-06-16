import { ref, getCurrentInstance } from '@vue/composition-api'

export function useTimeout(ms: number, now: boolean = false) {
  let ready = ref(false)
  let timer: any = null

  // Called by timer when done
  const timerFn = () => {
    ready.value = true
    timer = null
  }

  // Called to start timer
  const start = () => {
    ready.value = false
    timer = setTimeout(timerFn, ms)
  }

  // Called to stop timer
  const stop = () => {
    ready.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  if (now) start()
  if (getCurrentInstance()) stop()

  return { start, stop, ready }
}

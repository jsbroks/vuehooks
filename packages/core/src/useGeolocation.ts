import { onMounted, onUnmounted, ref, Ref } from '@vue/composition-api'

export function useGeolocation(options?: PositionOptions) {
  const timestamp: Ref<number | null> = ref(null)
  const error: Ref<PositionError | null> = ref(null)
  const coords: Ref<Coordinates> = ref({
    accuracy: 0,
    latitude: 0,
    longitude: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  })

  const update = (position: Position) => {
    timestamp.value = position.timestamp
    coords.value = position.coords
    error.value = null
  }

  let watchNumber: number | null = null

  onMounted(() => {
    if (!('geolocation' in navigator)) return
    watchNumber = navigator.geolocation.watchPosition(
      update,
      err => (error.value = err),
      options
    )
  })

  onUnmounted(() => {
    if (watchNumber === null) return
    navigator.geolocation.clearWatch(watchNumber)
  })

  return { coords, timestamp, error }
}

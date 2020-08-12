import { onMounted, onUnmounted, ref } from '@vue/composition-api'

export interface BatteryState extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

type NavigatorWithBattery = Navigator & {
  getBattery: () => Promise<BatteryState>
}

const batteryEvents = [
  'chargingchange',
  'levelchange',
  'chargingtimechange',
  'dischargingtimechange'
]

export function useBattery() {
  const supported = ref('getBattery' in navigator)
  const charging = ref(false)
  const chargingTime = ref(0)
  const dischargingTime = ref(0)
  const level = ref(0)

  let battery: BatteryState | null = null

  const updateBatteryInfo = () => {
    if (!battery) return
    charging.value = battery.charging
    chargingTime.value = battery.chargingTime
    dischargingTime.value = battery.dischargingTime
    level.value = battery.level
  }

  const listenAll = () =>
    batteryEvents.forEach(e => battery?.addEventListener(e, updateBatteryInfo))

  const unlistenAll = () =>
    batteryEvents.forEach(e =>
      battery?.removeEventListener(e, updateBatteryInfo)
    )

  onMounted(async () => {
    if (!supported.value) return
    battery = await (navigator as NavigatorWithBattery).getBattery()
    updateBatteryInfo()
    listenAll()
  })

  onUnmounted(() => unlistenAll())

  return { supported, charging, chargingTime, dischargingTime, level }
}

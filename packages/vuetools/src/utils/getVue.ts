import { getCurrentInstance } from '@vue/composition-api'

export function getVue(): Vue {
  const vue = getCurrentInstance()
  if (!vue) throw new Error('Missing Vue instance.')
  return vue
}

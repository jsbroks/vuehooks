import { getVue } from './utils/getVue'

export function useRouter() {
  const { $route: route, $router: router } = getVue()
  return { route, router }
}

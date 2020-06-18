import Vue from 'vue'

import { shallowMount } from '@vue/test-utils'
import { defineComponent } from '@vue/composition-api'
import { VueConstructor } from 'vue/types/umd'

// export function createCompositionVue() {
//   const localVue = createLocalVue()
//   localVue.use(api)
//   return localVue
// }

export function renderHook<V>(setup: () => V, vue?: VueConstructor<Vue>) {
  const App = defineComponent({
    template: '<div ref="app" id="app"></div>',
    setup
  })

  return shallowMount<Vue & V>(App, vue)
}

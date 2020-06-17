import Vue from 'vue'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import api, { defineComponent } from '@vue/composition-api'

const localVue = createLocalVue()
localVue.use(api)

export function renderHook<V>(setup: () => V) {
  const App = defineComponent({
    template: '<div ref="app" id="app"></div>',
    setup
  })

  return shallowMount<Vue & V>(App, { localVue })
}

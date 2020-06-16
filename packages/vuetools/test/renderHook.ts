import Vue from 'vue'

import { shallowMount, createLocalVue } from '@vue/test-utils'
import { defineComponent } from '@vue/composition-api'

const localVue = createLocalVue()

export default function renderHook<V>(setup: () => V) {
  const App = defineComponent({
    template: '<div ref="app" id="app"></div>',
    setup
  })

  return shallowMount<Vue & V>(App as any, {
    localVue
  })
}

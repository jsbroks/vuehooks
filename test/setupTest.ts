import Vue from 'vue'
import api from '@vue/composition-api'

if (Vue.version.startsWith('2')) {
  Vue.config.productionTip = false
  Vue.config.devtools = false

  Vue.use(api)
}

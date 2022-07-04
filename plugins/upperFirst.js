import Vue from 'vue'
import { startCase } from 'lodash-es'

export default Vue.filter('upperFirst', function (value) {
  if (!value) return ''
  // value = value.toString()
  return startCase(value)
  // return value.charAt(0).toUpperCase() + value.slice(1)
})

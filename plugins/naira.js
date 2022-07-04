import Vue from 'vue'

export default Vue.filter('naira', function (value) {
  // if (!value) return ''
  // value = value.toString()
  // return `₦${value}`
  return '₦' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
})

<template>
  <v-container>
    <p>Loading ...</p>
  </v-container>
</template>

<script>
import { Notify } from 'notiflix'

export default {
  name: 'LogoutPage',
  layout: 'auth',
  mounted() {
    this.$auth.logout()
    Notify.success('Signed out successfully', {
      timeout: 1000,
      position: 'right-bottom',
    })
  }
}
</script>

<style scoped>

</style>

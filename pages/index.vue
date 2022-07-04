<template>
<v-container>
  <AdminDashboardCards />
</v-container>
</template>

<script>
import AdminDashboardCards from '~/components/core/cards/AdminDashboard-Cards'
export default {
  name: 'AdminDashboardPage',
  components: { AdminDashboardCards },
  layout: 'admin',
  head: {
    title: 'Dashboard'
  }
}
</script>

<style scoped>

</style>

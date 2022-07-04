<template>
  <div v-if='$fetchState.pending'>
    <v-skeleton-loader type='card' />
  </div>
  <v-row v-else class='mt-2'>
    <v-col cols='12' sm='12' md='4'>
      <MaterialStatsCard
        color='primary'
        class='my-6'
        icon='mdi-account-multiple'
        title='Users'
        :value='usersCount'
        sub-icon='mdi-clock'
        sub-text='Just Updated'
      />
    </v-col>

    <v-col cols='12' sm='12' md='4'>
      <MaterialStatsCard
        color='primary'
        class='my-6'
        icon='mdi-domain'
        title='Communities'
        :value='communitiesCount'
        sub-icon='mdi-clock'
        sub-text='Just Updated'
      />
    </v-col>
  </v-row>
</template>

<script>
import { Report } from 'notiflix'
import MaterialStatsCard from '~/components/core/cards/MaterialStatsCard'


export default {
  name: 'AdminDashboardCards',
  components: { MaterialStatsCard },
  data() {
    return {
      usersCount: '0',
      communitiesCount: '0',
      loading: false
    }
  },
  async fetch() {
    try {
      this.loading = true

      this.usersCount = (await this.$axios.$get(`/users/users_count`)).count.toString()
      this.communitiesCount = (await this.$axios.$get(`/communities/count`)).count.toString()

      this.loading = false
    } catch ({ response }) {
      this.loading = false
      Report.failure('Error', response.data.message, 'Ok')
    }
  }
}
</script>

<style scoped></style>

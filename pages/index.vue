<template>
  <v-container>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: [(ctx) => {
    return ctx.redirect('/app')
  }],
  data: () => ({
    contacts: [
      {
        icon: 'mdi-phone',
        label: 'phone',
        value: '09028532576'
      },
      {
        icon: 'mdi-email',
        label: 'email',
        value: 'mid@mid.health'
      }
    ]
  }),
  fetch() {
    // eslint-disable-next-line no-console
    console.log('User', this.$auth.user)
  },
  head: {
    title: 'Home'
  }
}
</script>

<style scoped>
.full-screen {
  /*height: 100vh;*/
}

.body-content {
  font-size: 25px;
}

.round-card {
  border-radius: 20px;
  color: white;
}
</style>

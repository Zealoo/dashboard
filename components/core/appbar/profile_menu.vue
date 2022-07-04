<template>
  <v-menu offset-y transition='scroll-y-transition'>
    <template #activator='{ on, attrs }'>
      <v-list flat class='menu'>
        <v-list-item dense v-bind='attrs' v-on='on'>

          <v-avatar size='30' class='mr-2 white--text'>
            <!--            <v-img :src='$auth.user.profile_img' />-->
            <v-icon>mdi-account</v-icon>
          </v-avatar>

          <!--          <v-list-item-title  class="white&#45;&#45;text">Ahmad Muhammad</v-list-item-title>-->
          <v-list-item-title class='baloo-bai' :class='{ "grey--text text--darken-1": !$vuetify.theme.dark }'>
            {{ $auth.user.first_name | sentenceCase }}
            <!--            {{ 'ahmad' | sentenceCase }}-->
          </v-list-item-title>
          <v-list-item-icon>
            <v-icon color='darkgrey'>mdi-menu-down</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </template>
    <v-list flat>
      <v-list-item-group
        v-model='selectedItem'
        color='primary'
      >
        <!--        Dashboard     -->
        <v-list-item
          v-if='$auth && $auth.user && $auth.user.role !== "user"'
          link
          exact
          to='/app/admin'>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class='poppins'>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for='item in items'
          :key='item.title'
          link
          exact
          :to='item.to'
        >
          <v-list-item-icon>
            <v-icon v-text='item.icon'></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class='poppins' v-text='item.title'></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-switch
          v-model='$vuetify.theme.dark'
          dense
          label='Night Mode (BETA)'
          class='ma-1 ml-5 poppins'
        />
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: 'ProfileMenu',
  data: () => ({
    selectedItem: 1,
    items: [
      {
        icon: 'mdi-account',
        title: 'Profile',
        to: '/app/profile'
      },
      {
        icon: 'mdi-cog',
        title: 'Settings',
        to: '/app/settings'
      },
      {
        icon: 'mdi-logout',
        title: 'Sign Out',
        to: '/auth/logout'
      }
    ]
  }),
  computed: {},
  methods: {
    switchTheme() {
      this.$vuetify.theme.setTheme('dark', {})
    }
  }
}
</script>

<style scoped>
.menu {
  background-color: transparent !important;
}
</style>

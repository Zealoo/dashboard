<template>
  <v-app dark>
    <v-app-bar dense flat app>
      <v-btn icon class='d-none d-sm-flex' @click='miniVariant = !miniVariant'>
        <v-icon color='darkgrey'>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click='drawer = !drawer' />
      <v-spacer />
      <profile-menu />
    </v-app-bar>

    <v-navigation-drawer v-model='drawer' fixed :mini-variant='miniVariant' app>
        <v-toolbar-title
          v-if='miniVariant'
          class='mid-logo-mini ml-0 mt-5 mb-3 pa-2 baloo-bai'
          @click='$router.push(`/app`)'>
          Z
        </v-toolbar-title>
        <v-toolbar-title
          v-else
          class='mid-logo ml-4 mt-5 mb-1 baloo-bai pa-3'
          @click='$router.push(`/app`)'>
          Zealoo
        </v-toolbar-title>
        <!--      <p-->
        <!--      class='mid-logo baloo-bai'-->
        <!--      @click='$router.push("/app")'>-->
        <!--      m<span class='blue&#45;&#45;text text&#45;&#45;darken-1'>id</span>-->
        <!--      </p>-->

        <v-list
          dense
          class='poppins'
          nav
        >
          <v-list-item
            v-for='item in items'
            :key='item.title'
            link
            :to='item.to'
            exact
            :color='$vuetify.theme.dark ? "color" : "primary"'
            class='nav'
            exact-active-class='active'
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class='baloo-bai'>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Settings -->
          <v-list-group
            no-action
            :color='$vuetify.theme.dark ? "white" : "primary"'
            prepend-icon="mdi-cog"
          >
            <template #activator>
              <v-list-item-title class="baloo-bai" :class="{'white--text': $vuetify.theme.dark}">Settings</v-list-item-title>
            </template>
            <v-list-item
              v-for="setting in settings"
              :key="setting.title"
              :to='setting.to'
              class='nav'
              :color='$vuetify.theme.dark ? "color" : "primary"'
              exact-active-class='active'
              exact
            >
              <v-list-item-title class="baloo-bai" v-text="setting.title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="setting.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProfileMenu from '~/components/core/appbar/profile_menu'

export default {
  name: 'AdminLayout',
  components: {ProfileMenu },
  data() {
    return {
      drawer: null,
      miniVariant: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: `/` },
        { title: 'Users', icon: 'mdi-account-multiple', to: `/users` },
        { title: 'Communities', icon: 'mdi-account-multiple', to: `/communities` },
        { title: 'Reported Communities', icon: 'mdi-account-multiple', to: `/community-reports` },
        { title: 'Reported Users', icon: 'mdi-account-multiple', to: `/community-users` },
        // { title: 'Settings', icon: 'mdi-cog', to: `/app/admin/settings` }
      ],
      settings: [
        { title: 'General', icon: 'mdi-cogs', to: '/settings' },
        { title: 'Policy', icon: 'mdi-lock-check', to: '/settings/policy' },
        { title: 'Terms And Condition', icon: 'mdi-shield-lock', to: '/settings/tos' },
      ]
    }
  },
  fetch() {
    if (this.$auth.user.role === 'User')
      return this.$nuxt.error({ statusCode: 403, message: 'Forbidden resource' })
  },
  methods: {}
}
</script>

<style scoped>
</style>

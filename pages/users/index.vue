<template>
  <v-skeleton-loader v-if='$fetchState.pending' type='card' />
  <div v-else>
    <div>
      <v-row>
        <v-col sm='6'>
          <v-text-field
            v-model='userSearch'
            outlined
            dense
            class='poppins'
            placeholder='Search' />
        </v-col>
        <v-col>
          <v-btn class='primary poppins text-capitalize' text>
            Search
          </v-btn>
        </v-col>
      </v-row>
    </div>
<!--    items='$store.state.modules.dashboard.users.users'-->
    <div>
      <v-data-table
        :headers='userTableHeader'
        :items='users'
        :search='userSearch'
        :items-per-page='5'
        class='poppins'
      >
        <!--    avatar slut      -->
        <template #[`item.profile_img`]='{ item }'>
          <v-avatar class='my-5'>
            <v-img :src='item.profile_img'></v-img>
          </v-avatar>
        </template>

        <!--    name slut      -->
        <template #[`item.name`]='{ item }'>
          {{ `${item.first_name} ${item.last_name}` | upperFirst }}
        </template>

        <!--    Actions slut      -->
        <template #[`item.actions`]='{  }'>
          <v-btn icon @click='viewInfo(item)'>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
<!--          <v-btn icon @click='viewInfo(item)'>-->
<!--            <v-icon>mdi-pencil</v-icon>-->
<!--          </v-btn>-->
<!--          <EditUserDialogue :user='item' />-->
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { Report } from 'notiflix'
export default {
  name: 'AdminUserPage',
  components: {  },
  layout: 'admin',
  data() {
    return {
      userSearch: '',
      userTableHeader: [
        { text: 'Avatar', value: 'profile_img', class: 'primary white--text' },
        { text: 'User Name', value: 'user_name', class: 'primary white--text' },
        { text: 'Name', value: 'name', class: 'primary white--text' },
        { text: 'Email', value: 'email', class: 'primary white--text' },
        { text: 'Role', value: 'role', class: 'primary white--text' },
        { text: '', value: 'actions', class: 'primary white--text' }
      ],
      users: []
    }
  },
  async fetch() {
    // await this.$store.dispatch("modules/dashboard/users/getAllUsers")
    try {
      this.users = await this.$axios.$get(`/users`)
    } catch ({ response }) {
      Report.failure('Error', response.data.message, 'Ok')
    }
  },
  head: {
    title: 'Users'
  },
  methods: {
    viewInfo() {
      Report.warning('under development', 'Page under development', 'Ok')
    }
  }
}
</script>

<style scoped>
.v-text-field--outlined {
  font-family: Poppins;
}

.v-text-field--outlined >>> fieldset {
  border-color: #0057FF;
}
</style>

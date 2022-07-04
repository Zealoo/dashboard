<template>
  <v-container>
    <v-row v-if="tab === 'email'" align='center' style='height: 100vh'>
      <v-col cols='12' md='6'>
        <v-container fill-height>
          <v-card flat width='500' color=''>
            <div class='d-flex justify-center align-center'>
              <v-card-text>
<!--                <p-->
<!--                  class='mid-logo mx-3 baloo-bai'-->
<!--                  @click='$router.push("/")'>-->
<!--                  <mid-logo/>-->
<!--                  &lt;!&ndash;                  m<span class='blue&#45;&#45;text text&#45;&#45;darken-1'>id</span>&ndash;&gt;-->
<!--                </p>-->
                <div class='mx-3'>
                  <p class='ma-0 baloo-bai welcome mt-5'>
                    Welcome Back!
                  </p>
                  <p class='ma-0 poppins auth-text mt-1'>
                    Please enter your email to proceed.
                  </p>
                </div>
                <v-alert v-if='error' dense type='error' dismissible class='poppins mt-3'>
                  {{ error_message }}
                </v-alert>
                <v-form
                  ref='emailForm'
                  v-model='valid'
                  lazy-validation
                  @submit.prevent='checkEmail'
                >
                  <v-col cols='12' md='12' class="pt-5">
                    <span class='text-body-1'>Email</span>
                    <v-text-field
                      v-model='form_data.field'
                      name='email'
                      type='email'
                      aria-label='email'
                      clearable
                      :rules='[fieldRequired, email]'
                      outlined
                      placeholder='Enter your Email'
                    />
                  </v-col>

                  <v-col cols='12' md='12'>
                    <div>
                      <v-btn
                        block
                        x-large
                        dark
                        :loading='loading'
                        :disabled='!valid'
                        type='submit'
                        color='primary'
                        class='white--text poppins text-capitalize px-8 mt-1'
                        elevation='3'
                      >
                        Proceed
                      </v-btn
                      >
                    </div>
                  </v-col>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols='12' md='6' class='hidden-sm-and-down'>
        <v-img src='https://res.cloudinary.com/mid-assets/image/upload/v1654777179/mid/illustrations/email_imaghj.png' contain height='100%' width='100%'/>
      </v-col>
    </v-row>
    <v-row v-else align='center' style='height: 100vh'>
      <v-col cols='12' md='6'>
        <v-container fill-height>
          <v-card flat width='500' color=''>
            <div class='d-flex justify-center align-center'>
              <v-card-text>
                <div class='mx-3'>
                  <p class='ma-0 baloo-bai welcome mt-5'>
                    One More Step!
                  </p>
                  <p class='ma-0 poppins auth-text mt-1'>
                    Enter password for <strong>{{ form_data.email }}</strong>
                  </p>
                </div>
                <v-alert v-if='error' dense type='error' dismissible class='poppins mt-3'>
                  {{ error_message }}
                </v-alert>
                <v-form
                  ref='pwdForm'
                  v-model='valid'
                  lazy-validation
                  @submit.prevent='userLogin'
                >
                  <v-col cols='12' md='12' class='pt-5'>
                    <span class='text-body-1'>Password</span>
                    <v-text-field
                      v-model='form_data.password'
                      outlined
                      aria-label='password'
                      :rules='[fieldRequired]'
                      placeholder='Enter Your Password'
                      :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_password ? 'text' : 'password'"
                      name='password'
                      clearable
                      @click:append='show_password = !show_password'
                    />
                  </v-col>

                  <v-col cols='12' md='12'>
                    <div>
                      <v-btn
                        block
                        x-large
                        :loading='loading'
                        :disabled='!valid'
                        type='submit'
                        color='primary'
                        class='white--text poppins text-capitalize px-8 mt-1'
                        elevation='3'
                      >
                        Login
                      </v-btn
                      >
                    </div>
                  </v-col>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols='12' md='6' class='hidden-sm-and-down'>
        <v-img
          src='https://res.cloudinary.com/mid-assets/image/upload/v1654777181/mid/illustrations/protect2_shlltk.png'
          contain
          height='100%'
          width='100%'/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {Notify} from 'notiflix'
import rules from '@/mixins/rules'

export default {
  name: 'LoginPage',
  auth: 'guest',
  components: {
  },
  mixins: [rules],
  layout: 'auth',

  data: () => ({
    valid: false,
    loading: false,
    error: false,
    error_message: '',
    tab: 'email',
    form_data: {
      field: '',
      password: ''
    },
    show_password: false
  }),

  head: {
    title: 'Login'
  },
  computed: {},
  methods: {
    async checkEmail() {
      if (!this.$refs.emailForm.validate()) return

      if (this.$nuxt.isOffline)
        Notify.failure('Make sure you are connected to internet and try again')
      this.loading = true
      this.error = false
      this.error_message = ''

      this.form_data.email = this.form_data.field.toLowerCase()
      // making api call for login
      try {
        const user = await this.$axios.$get(`/users/byemail/${this.form_data.field}`)
        if (!user) {
          this.error = true
          this.error_message = 'Email not registered'
        }
        // console.log(response)
        this.loading = false
        this.tab = 'password'
      } catch (err) {
        this.loading = false
        if (err.response.status === 404) {
          this.error = true
          this.error_message = 'Email not registered'
          return
        }
        // console.log(err.response.data)
        this.error = true
        this.error_message = err.response.data.message || 'Something went wrong.'
        // this.form_data.password = ''
        // eslint-disable-next-line no-console
        console.log('err', err)
        // eslint-disable-next-line no-console
        console.log('response', err.response.data)
      }
    },
    async userLogin() {
      if (!this.$refs.pwdForm.validate()) return

      if (this.$nuxt.isOffline)
        Notify.failure('Make sure you are connected to internet and try again')
      this.loading = true
      this.error = false
      this.error_message = ''

      this.form_data.email = this.form_data.email.toLowerCase()
      // making api call for login
      try {
        await this.$auth.loginWith('local', {
          data: this.form_data
        })
        // console.log(response)
        this.loading = false
        Notify.success('Login Success', {
          timeout: 1000,
          position: 'right-bottom'
        })
      } catch (err) {
        // console.log(err.response.data)
        this.error = true
        this.error_message = err.response.data.message || 'Something went wrong.'
        // this.form_data.password = ''
        this.loading = false
        // eslint-disable-next-line no-console
        console.log('err', err)
        // eslint-disable-next-line no-console
        console.log('response', err.response.data)
      }
    }
  }
}
</script>

<style scoped>
</style>

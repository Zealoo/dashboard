import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Zealoo Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/naira',
    '~/plugins/sentenceCase',
    '~/plugins/upperFirst',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-storm',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  generate: {
    fallback: true,
  },

  // global router config
  router: {
    // Run the middleware/user-agent.js on every page
    middleware: ['auth'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000/api',
  },

  // loading bar
  loading: {
    color: '#002C6E',
    continuous: true,
    // throttle: 0
  },

  loadingIndicator: {
    name: 'chasing-dots',
    background: '#002C6E',
    color: '#fff',
  },

  // transition
  // transition: {
  //   name: 'page',
  //   mode: 'out-in'
  // },
  pageTransition: 'fade',
  layoutTransition: {
    name: 'my-layouts',
    mode: 'out-in',
  },

  // Auth modul configuration: https://auth.nuxtjs.org/
  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: `/auth/login`, method: 'post' },
          logout: { url: `/auth/logout`, method: 'get' },
          user: { url: `/auth/profile`, method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: `/app`,
      home: '/app',
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#002C6E',
          accent: colors.grey.darken3,
          secondary: '#2A80FF',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: '#002C6E',
          accent: colors.grey.darken3,
          secondary: '#2A80FF',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['lodash-es', 'vuetify/lib'],
    extractCSS: true,
  },
}

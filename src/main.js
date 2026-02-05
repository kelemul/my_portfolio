import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Icons
//import './assets/styles/global.css'
import '@mdi/font/css/materialdesignicons.css'
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0066B3', 
          success: '#009739', 
          error: '#EF3340', 
        },
      },
    },
  },
})

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
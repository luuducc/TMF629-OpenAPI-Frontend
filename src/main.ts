import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import Aura from '@primeuix/themes/aura'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'

import './assets/main.css'

import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(router)
app.use(ConfirmationService)
app.use(ToastService)
app.directive('tooltip', Tooltip)
app.mount('#app')

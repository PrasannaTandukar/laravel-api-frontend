import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axiosClient from "@/axios.js"
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi'
    }
})

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia)
app.use(router)
app.use(vuetify)
app.provide('http', axiosClient)

app.mount('#app')

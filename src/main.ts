import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/lib/apolloClient'

import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)
app.use(createPinia())
app.use(router)
app.use(createHead())

app.mount('#app')

// import vue from '@vitejs/plugin-vue'
// import VueDevTools from 'vite-plugin-vue-devtools'

import { YANDEX_API_KEY } from "./services/misc/constants"

export default defineNuxtConfig({
  // @ts-ignore
  ssr: true,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  meta: {
    title: 'Travel City Map',
  },
  app: {
    title: 'Travel City Map',
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Travel City Map',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&display=swap'
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ],
      script: [
        {
          src: `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`
        }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  css: ['~/assets/scss/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/variables.scss";'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://api.dvorfs.com'
    }
  }
})
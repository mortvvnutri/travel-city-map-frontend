import Http from '~/services/classes/Http'
import { useRuntimeConfig, defineNuxtPlugin } from '#imports'
import { PublicRuntimeConfig } from 'nuxt/schema'

export default defineNuxtPlugin(() => {
  const publicRuntimeConfig: PublicRuntimeConfig = useRuntimeConfig().public
  const http = new Http(publicRuntimeConfig.apiUrl)

  return {
    provide: {
      http
    }
  }
})

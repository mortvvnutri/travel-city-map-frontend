import { stringify } from 'qs'
import { useFetch } from '#imports'

export default class Http {
  get: (url: string, query?: object) => any
  post: (url: string) => any
  put: (url: string) => any
  delete: (url: string) => any

  constructor(baseUrl: string) {
    this.get = (url, query) => {
      const queryString = query ? `?${stringify(query)}` : ''
      return useFetch(baseUrl + url + queryString)
    }
    this.post = url => useFetch(baseUrl + url, { method: 'post' })
    this.put = url => useFetch(baseUrl + url, { method: 'put' })
    this.delete = url => useFetch(baseUrl + url, { method: 'delete' })
  }
}

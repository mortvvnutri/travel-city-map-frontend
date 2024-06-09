import { defineStore } from 'pinia'
import { APIURL } from '~/services/misc/constants'
import axios from 'axios'

export const useUserStore = defineStore('userstore', {
  state: (): any => ({
    firstscreen_cats: [],
    login_info: undefined
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  getters: {},
  actions: {
    setFscreenCats(cats: any[]): void {
      this.firstscreen_cats = cats
    },
    setLoginInfo(info: any): void{
        this.login_info = info
    },
    async wrapApi(url: string, with_captcha?: boolean, data?: any){
      if(!data){
        data = {}
      }
      if(with_captcha === undefined){
        with_captcha = false
      }

      if(this.login_info !== undefined && this.login_info.token){
        // auth present
        if(!data.user_initiator){
          data.user_initiator = {}
        }
        data.user_initiator.token = this.login_info.token
      }
      try {
        let resp_raw = await axios({
          method: 'post',
          url: `${APIURL}${url}`,
          headers: {
            accept: "application/json"
          },
          data: data
        })
        if(resp_raw.data){
          return resp_raw.data
        } else {
          return {
            error: "Failed to retrive data from the response",
            message: "Failed to retrive data from the response"
          }
        }
      } catch (error) {
        return {
          error: error,
          message: "Something went wrong when contacting the backend"
        }
      }
    }
  }
})

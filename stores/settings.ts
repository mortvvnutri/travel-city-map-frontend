import { defineStore } from 'pinia'
import { ISettingState, ICategoryList } from '~/services/interfaces/index'
import axios from 'axios';

import { APIURL } from '~/services/misc/constants'

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingState => ({
    initialProject: true,
    geo: undefined,
    pos: undefined,
    catloading: undefined,
    categories: [
      {"id":1,"name":"Развлечения"}
    ]
  }),
  getters: {},
  actions: {
    setInitialProject(initialProject: boolean): void {
      this.initialProject = initialProject
    },
    setCategories(categories: any[]): void {
      // console.debug('Storing categories', categories)
      // this.categories = categories
    },
    initPosEngine(): void{
      this.geo = window.navigator.geolocation;
      this.geo.watchPosition(
        (pos: any)=>{
          this.pos = pos
        },
        (err: any)=>{
          this.pos = undefined
          console.error(err)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 30000
        }
      )
    },
    async updateCats() {
      if(this.catloading){
        await this.catloading
        return
      }
      try {
        this.catloading = axios({
          method: 'post',
          url: `${APIURL}category/list`,
          headers: {
               accept: "application/json"
             },
          data: {}
        })
        let c = (await this.catloading).data
        this.categories = c?.categories || [] 
        this.catloading = undefined
      } catch (error) {
        console.error("updateCats error: ", error)
        this.catloading = undefined
      }
    },
    getCatById(id:number): any{
      let fl = this.categories.filter(e=>e.id===id)
      if(fl.length>0){
        return fl[0]
      }
    }
  }
})

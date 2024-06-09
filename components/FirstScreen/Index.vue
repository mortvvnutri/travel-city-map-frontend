<template>
  <div :class="['first-screen']">
    <div class="container">
      <header class="header">
        <logo-icon class="logo" />
        <p class="header-title">Как бы вы хотели провести время?</p>
      </header>
      <div class="content">
        <screen-card-skeleton v-if="!ct || !ct.length"/>
        <screen-card v-if="ct" v-for="category in ct" :key="category?.id" :card="category" :children="bc.getChildrenOf(id)" @cardsel="cardsel"/>
      </div>

      <button class="button" @click="goToApp()">ПОЕХАЛИ!</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import LogoIcon from '~/components/icons/LogoIcon.vue'
import ScreenCard from '~/components/FirstScreen/ScreenCard.vue'
import ScreenCardSkeleton from '~/components/FirstScreen/ScreenCardSkeleton.vue'
// import appRepository from '~/services/repositories/app-repository' // Удалено, так как больше не используется
import { useSettingsStore } from '~/stores/settings'
import { useUserStore } from '~/stores/userdata'

import { storeToRefs } from "pinia";
import { toRefs } from "vue";

import axios from 'axios';
import { APIURL } from '~/services/misc/constants.ts'
import { Breadcrumbs } from '~/services/misc/breadcrumbs.ts'

export default {
  components: {LogoIcon, ScreenCard, ScreenCardSkeleton},
  async setup(props) {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    const ct = ref([])
    const bc = ref({})
    const { categories } = storeToRefs(settingsStore);
    settingsStore.updateCats().then(r=>{
      bc.value = new Breadcrumbs(categories.value)
      ct.value = bc.value.top_row
    })
    
    const getchild = computed((id)=>{
      return bc.getChildrenOf(id)
    })

    const goToApp = () => {
      settingsStore.setInitialProject(false)
    }

    let sels = []
    const cardsel = (state, id) => {
      if(state){
        if(!sels.includes(id)){
          sels.push(id)
        } 
      } else {
          const index = sels.indexOf(id);
          if (index > -1) {
            sels.splice(index, 1);
          }
      }
      userStore.setFscreenCats(sels)
    }

    return {categories, goToApp, ct, bc, cardsel, getchild}
  }
}

</script>

<style lang="scss" scoped>
.first-screen {
  background: url('~/assets/images/first-screen-bg.svg') center center / cover no-repeat;
  width: 100%;
  height: 100vh;
  transition: 0.6s 0.135s;

  &.hidden-screen {
    opacity: 0;

    .header {
      .logo {
        top: -1000px;
      }
      &-title {
        left: -1000px;
      }
    }
    .content {
      left: -1000px;
    }
    .button {
      transform: scale(0);
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

    .logo {
      position: relative;
      top: 0;
      transition: 0.8s;
    }

    &-title {
      margin-top: 20px;
      width: 60%;
      text-align: center;
      color: $white-color;

      position: relative;
      left: 0;
      transition: 0.8s 0.05s;
    }
  }
  .content {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 320px;
    overflow-y: auto;

    position: relative;
    left: 0;
    transition: 0.6s 0.07s;

    &::-webkit-scrollbar {
      width: 6px;

      &-track {
        background: transparent; /* цвет дорожки */
      }
      &-thumb {
        background-color: rgb(0 0 0 / 20%);
        border-radius: 3px;
        border: 1px solid transparent;
      }
    }
  }
  .button {
    margin-top: 40px;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background: linear-gradient(39deg, #fcc879 0%, #fe8f7e 100%);
    color: $white-color;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    cursor: pointer;
    border: none;

    transition: 0.6s 0.1s;
  }
}
</style>

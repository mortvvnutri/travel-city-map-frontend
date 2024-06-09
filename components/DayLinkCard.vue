<template>
  <div class="cards">
    <h3>Вы можете посетить эти места</h3>
    <hr style="margin: 12px 0" />
    <div class="cards-list">
    <div class="cl-skeleton ns" v-if="!randomDaylicks || !randomDaylicks.length">
      <p>Составляем список предложений...</p>
      <div class="sc-skeleton-wipe"></div>
    </div>
      <div v-for="item in randomDaylicks" :key="item.id" class="item" @click="$emit('set-daylick', item.id)">
        <p class="title">{{ item.name }}</p>
        <p class="rating">
          Оценка: <span>{{ item.rating }}</span>
        </p>
        <app-checkbox />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import AppCheckbox from '~/components/ui/AppCheckbox.vue'

import axios from 'axios'

import { APIURL } from '~/services/misc/constants.ts'
// import appRepository from '~/services/repositories/app-repository' // Удалено, так как больше не используется

// Фейковые данные
// const fakeRandomDaylicks = [
//   { id: 1, name: 'Парк Горького', rating: 4.8 },
//   { id: 2, name: 'Центральный парк', rating: 4.7 },
//   { id: 3, name: 'Зоопарк', rating: 4.6 },
//   { id: 4, name: 'Ботанический сад', rating: 4.5 },
//   { id: 5, name: 'Театр', rating: 4.9 },
// ]

export default {
  emits: ['set-daylick'],
  components: { AppCheckbox },
  setup(props, ctx) {
    const randomDaylicks = ref([])

    // axios({
    //   method: 'get',
    //   url: `${APIURL}/api/random`,
    //   headers: {
    //     accept: "application/json"
    //   }
    // }).then(r => {
    //   randomDaylicks.value = r.data
    //   console.log(r.data)
    // })

    return {
      randomDaylicks
    }
  }
}
</script>

<style lang="scss" scoped>

@mixin keyframes($name){
    @keyframes #{$name}{
        @content;
    }
}

@mixin animate($animation,$duration,$method,$times){
    animation: $animation $duration $method $times;
}

.ns {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

.title {
  font-size: 16px;
  font-weight: 500;
}
.rating {
  font-size: 14px;

  span {
    color: #18bd1b;
  }
}

.cards-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  height: 350px;
  overflow-y: auto;
}
.item {
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  padding-inline: 20px;
  border-bottom: 1px solid rgba(120, 120, 120, 0.15);
  flex: 1 1 100%;
}

.cl-skeleton {
  border-radius: 4.5px;
  background: rgba(93, 84, 110, 0.85);
  box-shadow: 0 9px 18px 0 rgba(0, 0, 0, 0.05);
  border: none;
  padding: 12px 28px;
  cursor: pointer;

  margin-top: 1em;
  width: 100%;
  height: fit-content;

  color: $white-color;
  text-align: center;
  font-size: 16.25px;
  font-weight: 600;
  line-height: 110%;
  letter-spacing: -0.225px;
  overflow: hidden;
  position: relative;
}

.sc-skeleton-wipe{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      background-size: 200% 100% !important;
      background-repeat: no-repeat !important;
      background-position: 100% 0%;
      background: linear-gradient(248deg, rgba(0,0,0,0) 43%, rgba(255,255,255,0.2) 46%, rgba(0,0,0,0) 49%);
      cursor: wait;
      @include keyframes(wipe){
        0% {
          background-position: 120% 0%;
        }
        100% {
          background-position: 0% 0%;
        }
      };
      @include animate(wipe, 1s, cubic-bezier(.79,.14,.15,.86), infinite);
    }
</style>

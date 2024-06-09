<template>
  <div class="home">
    <first-screen v-show="initialProject" class="home__first-screen" />

    <div class="map-screen">
      <OverlayWidgets @set-screen-type="screenType = $event"/>
      <div id="map" style="min-width: 360px; height: 100vh"></div>
    </div>

    <div :class="['screen-slides', { 'screens-shown': !!screenType }]">
      <category-screen
        :class="['home-screen', { 'open-screen': screenType === 'category' }]"
        @screen-close="screenClose"
        @set-subcategory-for-map="setSubCategoryForMap"
      />
      <planing-screen
        :class="['home-screen', { 'open-screen': screenType === 'planing' }]"
        @screen-close="screenClose"
        @show-route="displayRouteOnMap"
      />
      <infos-screen
        :class="['home-screen', { 'open-screen': screenType === 'infos' }]"
        @screen-close="screenClose"
      />
      <ProfileScreen
        :class="['home-screen', { 'open-screen': screenType === 'profile' }]"
        @screen-close="screenClose"
      />
    </div>

    <menu-bar class="menu-bar" @set-screen-type="screenType = $event" />
  </div>
  <noscript><div><img src="https://mc.yandex.ru/watch/97461704" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
</template>

<script setup>
import FirstScreen from '~/components/FirstScreen/Index.vue'
import InfosScreen from '~/components/InfosScreen/Index.vue'
import OverlayWidgets from '~/components/ui/OverlayWidgets.vue'
import ProfileScreen from '~/components/ProfileScreen/ProfileScreen.vue'

import { useSettingsStore } from '~/stores/settings'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const settingsStore = useSettingsStore()
const { initialProject } = storeToRefs(settingsStore)

const screenType = ref('')
const optimalRoutes = ref([])

const screenClose = () => {
  screenType.value = ''
}

const setSubCategoryForMap = subcategoryForSearch => {
  searchByCategory(myMap, subcategoryForSearch)
}

// YANDEX MAP
let myMap

let last_control
  const searchByCategory = (myMap, searchValue = 'Москва') => {
    let searchControl = new window.ymaps.control.SearchControl({
      options: {
        provider: 'yandex#search'
      }
    })

    // Check if the control is on screen
    if(last_control){
      // And remove it to prevent clutter
      myMap.controls.remove(last_control)
    }
    // assign current map control as the last control added
    last_control = searchControl
    // add control to map
    myMap.controls.add(searchControl)
    searchControl.search(searchValue)

    myMap = null
  }

const displayRouteOnMap = (multiRoute) => {
  if (myMap) {
    console.log("multiroute plot")
    myMap.geoObjects.removeAll()
    myMap.geoObjects.add(multiRoute)
  }
}

// const mapBounds = [ [ 55.9320, 37.3076], [55.5680, 37.8805] ]
const mapBounds = [ [ 55.9887, 37.2018], [55.4249, 37.9776] ]

const initMap = () => {
  if (!myMap) {
    myMap = new ymaps.Map(document.getElementById('map'), {
      center: [55.7506, 37.6160],
      zoom: 12,
      controls: ['trafficControl', 'geolocationControl'],
    },{
      restrictMapArea: mapBounds,
      location: { bounds: mapBounds },
      maxZoom: 23,
      minZoom: 10,
    },{
      searchControlProvider: 'yandex#search'
    })

    if(!myMap.controls.get('rulerControl')){
      let rulerControl = new window.ymaps.control.RulerControl({
        options: {
          position:{
            left: 'calc(50% - 50px)',
            bottom: '162px',
          },
          adjustMapMargin:false,
        }
      })
      myMap.controls.add(rulerControl)
    }

  }
}

onMounted(() => {
  window.ymaps.ready(initMap);
  settingsStore.initPosEngine();
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(97461704, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
})
</script>

<style scoped lang="scss">
@import "assets/scss/mixins.scss";

.home {
  position: relative;
  min-width: 360px;
  height: 100vh;
  overflow: hidden;

  .screen-slides {
    position: absolute;
    @include background-opacity($black-color, 0.8);
    width: 100%;
    height: calc(100% - 30px);
    top: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s, opacity 0.2s;

    &.screens-shown {
      visibility: visible;
      opacity: 1;

      .home-screen.open-screen {
        top: 0;
        z-index: 1;
      }
    }
  }

  &-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100%;
    transition: 0.4s;
    z-index: 0;
  }

  &__first-screen {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .menu-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
.map-screen {
  position: relative;
}
</style>

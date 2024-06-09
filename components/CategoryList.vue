<template>
  <div class="cl-skeleton ns pd2" v-if="!categories?.top_row || !categories?.top_row?.length">
    <p>Составляем список предложений...</p>
    <div class="sc-skeleton-wipe"></div>
  </div>
  <div class="category-list pd2" v-if="categories.top_row.length !== 0">
    <button
      v-for="category in categories.top_row"
      :key="category.id"
      :class="['category-button', { 'category-active': activeId === category.id }]"
      @click="setcat(category.id)"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { useSettingsStore } from "~/stores/settings";
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import ArrowRight from '~/components/icons/ArrowRight.vue'

export default {
  components:{ArrowRight},
  props:['bc', 'active-id'],
  setup(props, ctx) {
    const activeId = ref(props['activeId']);
    const categories = ref(props['bc'])

    if (!categories.value) {
      categories.value = {};
      categories.value.top_row = []
    }

    const setcat = (id) => {
      ctx.emit('select-category', id)
      activeId.value = id
    }

    return {
      categories,
      activeId,
      setcat
    }
  }
}



</script>

<style lang="scss" scoped>
@mixin keyframes($name) {
  @keyframes #{$name} {
    @content;
  }
}

@mixin animate($animation, $duration, $method, $times) {
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

.category-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  max-height: 10em;
  overflow-y: scroll;
}
.category-button {
  border-radius: 4.5px;
  background: rgba(188, 154, 255, 0.85);
  box-shadow: 0 9px 18px 0 rgba(0, 0, 0, 0.05);
  border: none;
  padding: 12px 18px;
  cursor: pointer;

  color: $white-color;
  text-align: center;
  font-size: 11.25px;
  font-weight: 600;
  line-height: 110%;
  letter-spacing: -0.225px;

  &.category-active {
    background: $white-color;
    color: $black-color;
  }
}

.pd2 {
  margin-top: 1em;
}

.cl-skeleton {
  border-radius: 4.5px;
  background: rgba(93, 84, 110, 0.85);
  box-shadow: 0 9px 18px 0 rgba(0, 0, 0, 0.05);
  border: none;
  padding: 12px 28px;
  cursor: pointer;

  margin-top: 1em;

  color: $white-color;
  text-align: center;
  font-size: 16.25px;
  font-weight: 600;
  line-height: 110%;
  letter-spacing: -0.225px;
  overflow: hidden;
  position: relative;
}

.sc-skeleton-wipe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: 200% 100% !important;
  background-repeat: no-repeat !important;
  background-position: 100% 0%;
  background: linear-gradient(
    248deg,
    rgba(0, 0, 0, 0) 43%,
    rgba(255, 255, 255, 0.2) 46%,
    rgba(0, 0, 0, 0) 49%
  );
  cursor: wait;
  @include keyframes(wipe) {
    0% {
      background-position: 120% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  @include animate(wipe, 1s, cubic-bezier(0.79, 0.14, 0.15, 0.86), infinite);
}
</style>

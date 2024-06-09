<template>
  <div class="screen-card ns" @click="onch(card)">
    <header class="screen-card__header">
      <p class="title">{{ card.name }}</p>
      <app-checkbox :checked="sel"/>
    </header>
    <p class="description">{{ subcategoryList }}</p>
  </div>
</template>

<script lang="ts">
import AppCheckbox from "~/components/ui/AppCheckbox.vue";
import { toRefs, computed, ref } from "vue";

import { trim }  from "~/services/misc/utils.ts"

export default {
  components: { AppCheckbox },
  props: ["card", "children", "bc"],
  setup(props, ctx) {
    const card = ref(props.card);
    const sel = computed(()=>{
      return card.value.isSelect
    })

    const subcategoryList = computed(() => {
      return trim((props.children || []).map((e) => e.name).join(", "), 40);
    });

    const onch = (c) => {
      card.value.isSelect = !sel.value;
      ctx.emit('cardsel', card.value.isSelect, card.value.id)
    };

    return { card, subcategoryList, onch, sel};
  },
};
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

.screen-card:active{
  transform: scale(0.98);
}

.screen-card:hover{
  filter: brightness(1.1);
}

.screen-card {
  border-radius: 8px;
  background: rgba(188, 154, 255, 0.85);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
  padding: 16px;
  backdrop-filter: blur(3px);
  cursor: pointer;
  transition: transform 100ms ease-in-out, filter 200ms ease-in-out;

  &__header {
    display: flex;
    justify-content: space-between;

    .title {
      color: $white-color;
      font-weight: 600;
      line-height: 110%; /* 17.6px */
      letter-spacing: -0.32px;
    }
  }

  .description {
    margin-top: 8px;
    color: $white-color;
    opacity: 0.8;
    font-size: 12px;
    line-height: 110%;
    letter-spacing: -0.24px;
  }
}
</style>

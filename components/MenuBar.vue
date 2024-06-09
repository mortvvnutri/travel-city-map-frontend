<template>
  <div class="menu">
    <div class="container menu__container">
      <div class="category" @click="emit('set-screen-type', 'category')">
        <category-icon />
        Категории
      </div>
      <div class="planing" @click="emit('set-screen-type', 'planing')">
        <planing-icon />
        Планирование
      </div>
      <div class="infos" @click="emit('set-screen-type', 'infos')">
        <info-icon />
        Информация
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CategoryIcon from '~/components/icons/CategoryIcon.vue'
  import PlaningIcon from '~/components/icons/PlaningIcon.vue'
  import InfoIcon from '~/components/icons/InfoIcon.vue'

  const emit = defineEmits(['set-screen-type'])
</script>

<style lang="scss" scoped>
  .menu {
    padding: 20px 0 68px;
    background: $white-color;
    position: relative;
    width: 90%;
    border-radius: 12px 12px 0 0;

    &__container {
      display: flex;
      justify-content: space-between;
    }

    .category,
    .planing,
    .infos {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      cursor: pointer;
      color: rgb(red($black-color), green($black-color), blue($black-color), 0.8);

      &:hover {
        color: $primary-color;
      }
    }

    .planing {
      position: absolute;
      left: 50%;
      transform: translateY(-30%) translateX(-50%);
      top: 0;
    }
  }
</style>

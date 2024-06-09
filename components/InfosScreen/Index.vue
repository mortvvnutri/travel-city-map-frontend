<template>
  <div class="screen">
    <div class="global-content-screen">
      <close-screen @click="emit('screen-close')" />

      <div class="container screen-container">
        <div class="content">
          <h2 class="title">Полезная информация</h2>
          <hr style="margin: 20px 0" />

          <links-card class="divider" />

          <daylick-card class="divider" />

          <bank-card class="divider" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LinksCard from '~/components/InfosScreen/LinksCard.vue'
  import BankCard from '~/components/InfosScreen/BankCard.vue'
  import DaylickCard from '~/components/DaylickCard.vue'
  import CloseScreen from '~/components/ui/CloseScreen.vue'

  const emit = defineEmits(['screen-close'])
</script>

<style lang="scss" scoped>
  .screen {
    position: relative;

    &-close {
      position: absolute;
      top: 46px;
      right: 16px;
    }
    &-container {
      padding-block: 16px;

      .content {
        margin-top: 20px;
        margin-bottom: 20px;
        height: calc(100vh - 100px);
        overflow-y: auto;
      }
    }
  }

  .divider {
    margin-top: 12px;
    padding-bottom: 12px;
    padding-top: 12px;
  }
  .divider:not(:last-child) {
    border-bottom: 1px solid rgba(120 120 120 / 15%);
  }
</style>

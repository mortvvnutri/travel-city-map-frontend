<template>
  <div class="daylick">
    <div class="card" @click="modalShown()">
      <p class="title">Чем заняться сегодня?</p>
      <span>{{ progressValue }} / 4</span>
      <circle-progres :progress-value="progressValue" />
    </div>
    <div v-if="modalIsShown" class="daylick-modal" @click="modalIsShown = false">
      <div class="content" @click.stop>
        <day-link-card @set-daylick="setProgressValue()" />
        <button class="content-button" @click="modalIsShown = false">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import DayLinkCard from '~/components/DayLinkCard.vue'

  const progressValue = ref(0)
  const modalIsShown = ref(false)

  const modalShown = () => {
    modalIsShown.value = !modalIsShown.value
  }
  const setProgressValue = () => {
    progressValue.value = 1
  }
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    align-items: center;
    background: $white-color;
    border-radius: 12px;
    margin: 0 4px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
  }
  .daylick-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    .content {
      background: $white-color;
      padding: 12px;
      border-radius: 12px;
      width: 90%;
      margin: 0 auto;
    }
  }
  .content-button {
    margin-top: 20px;
    border-radius: 8px;
    background: linear-gradient(3deg, #fcc879 0%, #fe8f7e 100%);
    padding: 20px 28px;
    width: 100%;
    border: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    line-height: 110%;
    letter-spacing: -0.32px;
    text-transform: uppercase;
    cursor: pointer;
  }
</style>

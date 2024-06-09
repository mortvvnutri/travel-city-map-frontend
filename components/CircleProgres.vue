<template>
  <svg class="circle-progress" width="48" height="48">
    <!-- r = (widthSVG / 2) - (strokeWidth * 2) -->
    <circle stroke="#eef3f6" stroke-width="4" cx="24" cy="24" r="12" fill="transparent" />
    <circle
      stroke="#78CD80"
      stroke-width="4"
      cx="24"
      cy="24"
      r="12"
      fill="transparent"
      :stroke-dashoffset="offsetDash"
      :stroke-dasharray="`${circumference} ${circumference}`"
    />
  </svg>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'

  interface IProps {
    progressValue: number
  }

  let offsetDash = ref(0)

  const circumference = 2 * Math.PI * 12
  const setProgress = (percent: number) => {
    offsetDash.value = circumference - (percent / 4) * circumference
  }

  const props = defineProps<IProps>()
  const { progressValue } = toRefs(props)

  setProgress(progressValue.value)
</script>

<style lang="scss" scoped>
  .circle-progress {
    transform: rotate(-90deg);
  }
</style>

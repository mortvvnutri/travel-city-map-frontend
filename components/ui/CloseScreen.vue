<template>
  <button class="screen-close" @click="$emit('screen-close')" :style="{'color': clr}">&times;</button>
</template>

<script lang="ts">
  export default {
    props: ['color'],
    setup(props, ctx) {
      const clr = props.color || "$primary-color"
      return { clr }
    }
  }
</script>

<style lang="scss" scoped>
  .screen-close {
    position: absolute;
    top: 46px;
    right: 16px;
    border: none;
    background: transparent;
    color: $primary-color;
    font-size: 32px;
    line-height: 32px;
    padding: 10px;
    cursor: pointer;
    z-index: 20;
  }
</style>

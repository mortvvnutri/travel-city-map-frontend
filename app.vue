<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style lang="scss">
  @mixin keyframes($name) {
    @keyframes #{$name} {
      @content;
    }
  }

  @mixin animate($animation, $duration, $method, $times) {
    animation: $animation $duration $method $times;
  }

  .loader {
  width: 24px;
  height: 24px;
  border-top: 3px solid #fff;
  border-left: 3px solid #fff;
  display: inline-block;
  border-radius: 50px;

  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

  .ns {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
<template>
  <div class="screen-card ns">
    <header class="screen-card__header">
      <p class="title">Загрузка...</p>
    </header>
    <p class="description">Пожалуйста, подождите...</p>
    <div class="sc-skeleton-wipe"></div>
  </div>
</template>

<script setup lang="ts">
 
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

  .screen-card {
    border-radius: 8px;
    background: rgba(93, 84, 110, 0.85);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
    padding: 16px;
    position: relative;
    overflow: hidden;

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
      display: block;
      z-index: 1;
      margin-top: 8px;
      color: $white-color;
      opacity: 0.8;
      font-size: 12px;
      line-height: 110%;
      letter-spacing: -0.24px;
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
  }


  
</style>

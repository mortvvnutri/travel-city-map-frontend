<template>
  <div class="o-widgets-box ns">
    <div class="ow-profile ow-button" @click='openprofile'>
        <img src="~/assets/images/profile.svg" alt="Open profile" class='ow-icon'>
    </div>
  </div>
</template>
<script>
export default {
  setup(props, ctx) {
    const openprofile = () => {
        console.log('hook for opening profile screen')
        ctx.emit('set-screen-type', 'profile')
    }
    return {openprofile};
  },
};
</script>
<style lang="scss">
.o-widgets-box{
    position: absolute;
    z-index: 1;
    width: 100%;
}

.ow-icon{
    height: 100%;
    opacity: 1;
    transition: opacity 100ms cubic-bezier(.86,0,.07,1);
    pointer-events: none;
}

.ow-button{
    width: 48px;
    height: 48px;
    background: white;
    box-shadow: 0 9px 18px 0 rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    transition: transform 100ms cubic-bezier(.86,0,.07,1), background 100ms cubic-bezier(.86,0,.07,1);
    cursor: pointer;
}

.ow-button:hover{
    transform: scale(1.08);
    .ow-icon{
        opacity: 0.8;
    }
}

.ow-button:active{
    transform: scale(0.95);
    background: rgb(220, 220, 220);
}

.ow-profile{
    position: absolute;
    right: 16px;
    top: 64px;
}
</style>

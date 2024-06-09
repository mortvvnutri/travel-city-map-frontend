<template>
<div @click="clk">
   <label class="checkbox">
    <checkbox-icon v-if="!!checkboxValue" />
    <checkbox-empty-icon v-else />
    <!-- <input
      type="checkbox"
      class="fake"
      :v-model="checkboxValue"
    /> -->
  </label>
</div>
 
</template>

<script lang="ts">
  import CheckboxEmptyIcon from '~/components/icons/CheckboxEmptyIcon.vue'
  import CheckboxIcon from '~/components/icons/CheckboxIcon.vue'
  import { ref } from 'vue'

  export default {
    components: {CheckboxEmptyIcon, CheckboxIcon},
    props:['checked'],
    setup(props, ctx) {
      const checkboxValue = computed(()=>{
        return props.checked
      })
      const clk = (e) => {
        // e.stopPropagation()
        // console.log('checkbox trigger',checkboxValue.value)
        // checkboxValue.value = !checkboxValue.value
      }
      return {
        checkboxValue,
        clk
      }
    }
  }
</script>

<style lang="scss" scoped>
  .checkbox {
    cursor: pointer;
  }
  .fake {
    display: none;
  }
</style>

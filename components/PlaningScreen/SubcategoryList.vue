<template>
  <div class="subcategory-list">
    <label v-for="subCategory in subcategoryList" :key="subCategory.id" class="item">
      <span>{{ subCategory.name }}</span>
      <input
        v-show="false"
        type="checkbox"
        name="subcategory"
        :checked="subCategory.selected"
        @change="clkchange(subCategory)"
      />
      <plus-icon v-if="!subCategory.selected && bc.getChildrenOf(subCategory.id).length===0" width="20" />
      <minus-icon v-if="subCategory.selected && bc.getChildrenOf(subCategory.id).length===0" width="20" />
      <arrow-right v-if="(bc.getChildrenOf(subCategory.id)||[]).length>0" width="20" @click="$emit('deeper', subCategory.id)" />
    </label>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, computed } from "vue";
import { ICategoryList } from "~/services/interfaces";
import PlusIcon from "~/components/icons/PlusIcon.vue";
import MinusIcon from "~/components/icons/MinusIcon.vue";
import ArrowRight from "~/components/icons/ArrowRight.vue";

export default {
  props: ["subcategory-list",'bc'],
  components: { PlusIcon, MinusIcon, ArrowRight },
  setup(props, ctx) {
    const bc = props.bc
    const subcategoryList = computed(()=>{
      return props.bc.list
    });
      console.debug('parking', bc.getChildrenOf(32))

    const clkchange = (cat) => {
      if(bc.getChildrenOf(cat.id).length>0){
        return
      }
      cat.selected = !cat.selected
      ctx.emit('catsel', cat.id, cat.selected)
    }

    return {
      subcategoryList,
      bc,
      clkchange
    };
  },
};
</script>

<style lang="scss" scoped>
.subcategory-list {
  padding-top: 12px;
}
.item {
  margin: 0 24px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(39, 39, 39, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<template>
  <div class="subcategory-list">
    <div

      v-for="subCategory in subcategoryList"
      :key="subCategory.id"
      class="item"
      @click="setSubcategoryForSearch(subCategory.name, subCategory.id)"
    >
      <span>{{ subCategory.name }}</span>
      <plus-icon v-if="bc.getChildrenOf(subCategory.id).length>0" width="20" />
      <arrow-right v-else width="20" />
    </div>
  </div>
</template>

<script lang="ts">
  import { toRefs, ref, computed } from 'vue'
  import { ICategoryList } from '~/services/interfaces'
  import ArrowRight from '~/components/icons/ArrowRight.vue'
  import PlusIcon from '~/components/icons/PlusIcon.vue'

  export default {
    components:{ArrowRight, PlusIcon},
    props:['bc', 'subcategory-list'],
    setup(props, ctx) {
      const setSubcategoryForSearch = (categoryName: any, id:number) => {
        ctx.emit('set-subcategory-for-map', categoryName, id)
      }

      const subcategoryList = computed(()=>{
        return props.bc.list
      })

      const bc = props.bc
      return {
        setSubcategoryForSearch,
        subcategoryList,
        bc
      }
    }
  }
  
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

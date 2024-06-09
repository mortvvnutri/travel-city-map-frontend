<template>
  <div class="screen">
    <div class="global-content-screen content-screen-container">
      <close-screen @click="$emit('screen-close')" />

      <div class="container screen-container">
        <div class="content">
          <header class="header">
            <p class="title">Какие места вам отобразить?</p>
            <arrow-left
              class="back-btn"
              v-if="bc.trail.length > 2"
              width="25"
              @click="bcBack"
            />
            <category-list
              :active-id="categoryId"
              :bc="bc"
              class="header__category-list"
              @select-category="setCategoryId"
            />
          </header>
          <div class="content-body">
            <subcategory-list
              :subcategory-list="subcategoryByCategory"
              :bc="bc"
              class="content-body__subcategory-list"
              @set-subcategory-for-map="setSubCategoryForMap"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import CategoryList from "~/components/CategoryList.vue";
import SubcategoryList from "~/components/CategoryScreen/SubcategoryList.vue";
import CloseScreen from "~/components/ui/CloseScreen.vue";
import ArrowLeft from "~/components/icons/ArrowLeft.vue";

import axios from "axios";

import { APIURL } from "~/services/misc/constants.ts";
// import appRepository from '~/services/repositories/app-repository' // Удалено, так как больше не используется

import { useSettingsStore } from "~/stores/settings";

import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { Breadcrumbs } from "~/services/misc/breadcrumbs.ts";

export default {
  components: {
    CategoryList,
    SubcategoryList,
    CloseScreen,
    ArrowLeft,
  },
  emits: ["screen-close", "set-subcategory-for-map"],
  async setup(props, ctx) {
    const settingsStore = useSettingsStore();
    const { categories } = storeToRefs(settingsStore);
    await settingsStore.updateCats()
    const bc = ref(new Breadcrumbs(categories.value));

    const ct = ref(bc.value.top_row);

    const toprow = ref(bc.value.top_row);
    const categoryId = ref(1);
    const subcategoryByCategory = ref([
      {
        name: "Loading...",
        id: 1,
      },
    ]);

    const bcBack = () => {
      bc.value.goBack();
    };

    const setCategoryId = (id: any) => {
      categoryId.value = id;
      bc.value.switchLast(id);
      toprow.value = bc.value.top_row;
      subcategoryByCategory.value = bc.value.list;
      // let children = bc.value.getChildrenOf(id).length
      // if(children){
      //   console.log(JSON.stringify(bc.value.top_row))
      //   bc.value.switchLast(id)
      // }
      // createSubCategoryById(id)
    };

    const createSubCategoryById = async (id) => {
      subcategoryByCategory.value = [];
    };

    createSubCategoryById();

    const setSubCategoryForMap = (subcategoryName: any, id: number) => {
      if (bc.value.getChildrenOf(id).length > 0) {
        bc.value.deeper(id);
        toprow.value = bc.value.top_row;
        subcategoryByCategory.value = bc.value.list;
      } else {
        ctx.emit("set-subcategory-for-map", subcategoryName);
        ctx.emit("screen-close");
      }
    };
    return {
      setSubCategoryForMap,
      subcategoryByCategory,
      categoryId,
      setCategoryId,
      bc,
      toprow,
      bcBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.back-btn {
  margin-top: 1em;
  cursor: pointer;
}

.screen {
  position: relative;

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
.content {
  .header {
    .title {
      color: $white-color;
      font-size: 16px;
      font-weight: 700;
      line-height: 110%; /* 17.6px */
      letter-spacing: -0.32px;
    }
    &__category-list {
      margin-top: 24px;
    }
  }
}
.content-screen-container {
  background: linear-gradient(223deg, #ad84ff 0%, #8550ef 50.87%, #8550ef 100%);
}
.content-body {
  height: 400px;
  overflow-y: auto;
  margin-top: 24px;
  background: $white-color;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgb(0 0 0 / 5%);
}
</style>

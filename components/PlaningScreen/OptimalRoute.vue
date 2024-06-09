<template>
  <div class="routes">
    <div v-for="point in optimalRoutes" :key="point.id" class="point">
      <point-icon class="point-icon" />
      <div class="p_text">
        <div class="p_name">
          {{ point.name }}
        </div>
        <div class="p_desc">
          {{point.details || st.getCatById(point.category_id).name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs } from "vue";
import PointIcon from "~/components/icons/PointIcon.vue";
import { useSettingsStore } from "~/stores/settings";

export default {
  props: ["optroute"],
  components: { PointIcon },
  setup(props, ctx) {
    const st = useSettingsStore();
    const optimalRoutes = ref(props.optroute);
    return { optimalRoutes, st };
  },
};
</script>

<style lang="scss" scoped>
.p_text {
  position: relative;
}

.p_desc {
  position: absolute;
  font-size: 0.8em;
  margin-top: 1em;
  opacity: 0.7;
}

.routes {
  border-radius: 4.5px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.05);
  padding: 32px;

  display: flex;
  flex-direction: column;
  gap: 80px;

  height: 350px;
  overflow-y: auto;
}
.point {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    display: block;
    background: url("~/assets/images/point-arrow.svg");
    background-repeat: no-repeat;
    height: 65px;
    width: 10px;
    position: absolute;
    top: 40px;
    left: 12px;
  }

  .point-icon {
    $size: 32px;
    min-width: $size;
    min-height: $size;
    max-width: $size;
    max-height: $size;
  }
}
</style>

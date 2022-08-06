<template>
  <q-table table-header-class="table-header" v-bind="$attrs" :hide-pagination="!showPagination" :flat="!noFlat"
    :bordered="!noBorder">
    <template v-for="slot in slots" :key="slot.name" v-slot:[slot.name]="props">
      <slot :name="slot.name" v-bind="props" :key="slot.name" />
    </template>
  </q-table>
</template>

<script>
import { useSlots } from "src/composables/use-slots";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseTable",
  inheritAttrs: false,
  props: {
    showPagination: Boolean,
    noFlat: Boolean,
    noBorder: Boolean,
    rowKey: {
      type: String,
      default: "name",
    },
  },
  setup (props, { slots }) {
    return {
      slots: useSlots(slots),
    };
  },
});
</script>

<style lang="scss">
.table-header {

  th {
    font-size: 14px;
  }
}
</style>

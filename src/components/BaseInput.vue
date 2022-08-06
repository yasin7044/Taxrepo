<template>
  <div :class="`base-input ${classes}`">
    <div
      v-if="label"
      class="q-mb-xs"
    >{{ label }}</div>
    <q-input
      :dense="!noDense"
      :outlined="!noOutlined"
      v-bind="$attrs"
      @keyup="onEnter"
    >
      <template
        v-for="slot in slots"
        :key="slot.name"
        v-slot:[slot.name]="scope"
      >
        <slot
          :key="slot.name"
          :name="slot.name"
          v-bind="scope"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { inputFieldProps } from "./inputProps";
import { useSlots } from "src/composables/use-slots";

export default {
  inheritAttrs: false,
  name: "BaseInput",
  props: {
    ...inputFieldProps,
  },
  setup (props, { slots }) {
    return {
      slots: useSlots(slots),
    };
  },
  methods: {
    onEnter (event) {
      if (event.which === 13) {
        let tabindex = event.target.attributes.tabindex.value;
        const nextInput = document.querySelector('input[tabindex^="' + (parseInt(tabindex) + 1) + '"]');
        if (nextInput) {
          nextInput.focus();
          return false;
        }
      }

    }
  }
};
</script>
<style lang="scss">
</style>

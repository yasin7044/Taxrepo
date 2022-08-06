<template>
  <div :class="`${classes} base-select`">
    <!-- {{ label }} -->
    <div
      v-if="label"
      class="q-mb-xs"
    >{{ label }}</div>
    <q-select
      :dense="!noDense"
      :emit-value="!noEmitValue"
      :map-options="!noMapOptions"
      :option-label="optionLabel"
      :option-value="optionValue"
      :options="modifiedOptions"
      :outlined="!noOutlined"
      :use-input="useInput"
      input-debounce="0"
      v-bind="$attrs"
      @filter="filter"
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
    </q-select>
  </div>
</template>

<script>
import { inputSelectProps } from "./inputProps";
import { useSlots } from "src/composables/use-slots";
import { ref } from "vue";

export default {
  name: "BaseSelect",
  inheritAttrs: false,
  props: {
    ...inputSelectProps,
  },
  setup (props, { slots }) {
    const modifiedOptions = ref(props.options);

    return {
      slots: useSlots(slots),
      modifiedOptions,
    };
  },
  methods: {
    filter (inputValue, update, abort) {
      if (this.useFilter) {
        this.$emit("filter", inputValue, update, abort);
      } else {
        update(() => {
          this.modifiedOptions = this.filterOptions(inputValue);
        });
      }
    },
    filterOptions (inputValue) {
      if (inputValue.trim() === "") {
        return this.options;
      }
      const needle = inputValue.toLowerCase();
      return this.options.filter((option) => {
        if (typeof option === "string" || option instanceof String) {
          return option?.toLowerCase()?.includes(needle) ?? true;
        } else if (typeof option === "number" || option instanceof Number) {
          return option?.toString()?.includes(needle) ?? true;
        } else if (typeof option === "object" && this.optionLabel) {
          return option[this.optionLabel]?.toLowerCase()?.includes(needle) ?? true;
        }
        return this.options;
      });
    },
    onEnter (event) {
      if (event.which === 13) {
        let tabindex = event.target.attributes.tabindex.value;
        console.log(tabindex)
        const nextInput = document.querySelector('input[tabindex^="' + (parseInt(tabindex) + 1) + '"]');
        console.log(nextInput)
        if (nextInput) {
          nextInput.focus();
          return false;
        }
      }

    }
  },
  emits: ["filter"]
};
</script>

<style lang="scss">
.base-label {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 0.2857rem;
}

.q-field__native.row.items-center {
  span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

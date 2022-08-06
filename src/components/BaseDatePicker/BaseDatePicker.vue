<template>
  <div :class="`${classes} base-date-picker`">
    <BaseLabel v-if="label" :label="label" />
    <q-field v-model="date" :dense="!noDense" :disable="disable" :outlined="!noOutlined" :readonly="readonly"
      v-bind="$attrs">
      <FlatPicker ref="flatPicker" v-model="date" :config="computedConfig" :disabled="readonly || disable"
        :placeholder="placeholder" :readonly="readonly || disable" class="q-field__native q-placeholder" tabindex="0"
        type="text" />
      <template v-for="slot in slots" :key="slot.name" v-slot:[slot.name]="scope">
        <slot :key="slot.name" :name="slot.name" v-bind="{ scope, fp: $refs?.flatPicker?.fp }" />
      </template>
    </q-field>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import FlatPicker from "vue-flatpickr-component";
import { inputFieldProps } from "../props/inputProps";
import BaseLabel from "components/BaseLabel/BaseLabel";
import { useSlots } from "composables/use-slots";
import { formatDate } from "src/utils/helpers";

export default defineComponent({
  name: "BaseDatePicker",
  inheritAttrs: false,

  computed: {
    date: {
      get () {
        return formatDate(this.modelValue);
      },
      set (value) {
        this.$emit("update:modelValue", value);
      },
    },

    computedConfig () {
      return {
        ...this.config,
        enable: [this.selectedDate, ...this.config?.enable],
      };
    },
  },

  components: {
    FlatPicker,
    BaseLabel,
  },

  props: {
    ...inputFieldProps,
    modelValue: {
      type: [String, Date],
    },

    config: {
      type: Object,
      default: () => ({
        dateFormat: "m/d/Y",
        altFormat: "m/d/Y",
        enable: [
          {
            from: "today",
            to: "07-30-2025",
          },
        ],
      }),
    },

    placeholder: String,
    readonly: Boolean,
    disable: Boolean,
    noIsoString: Boolean,
  },

  setup (props, { slots }) {
    return {
      slots: useSlots(slots),
      selectedDate: formatDate(props.modelValue),
    };
  },
});
</script>

<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
</style>

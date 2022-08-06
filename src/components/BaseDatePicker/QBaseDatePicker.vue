<template>
  <BaseInput v-model="date" :disable="disable" :readonly="readonly" v-bind="$attrs">
    <template v-slot:append>
      <q-icon class="cursor-pointer" name="event">
        <q-popup-proxy cover transition-hide="scale" transition-show="scale">
          <q-date v-model="date" :disable="disable" :options="filterOptions" :readonly="readonly">
            <div class="row items-center justify-end">
              <q-btn v-close-popup color="primary" flat label="Close" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-for="slot in slots" :key="slot.name" v-slot:[slot.name]="scope">
      <slot :key="slot.name" :name="slot.name" v-bind="scope" />
    </template>
  </BaseInput>
</template>

<script>
import { useSlots } from "src/composables/use-slots";
// import { defaultDateFormat } from "src/utils/format";
import { date } from "quasar";
export default {
  name: "BaseDatePicker",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Date],
    },
    readonly: Boolean,
    disable: Boolean,
    noIsoString: Boolean,
    options: Function,
  },

  computed: {
    date: {
      get () {
        if (this.noIsoString) {
          return this.modelValue;
        } else {
          return date.formatDate(this.modelValue);
        }
      },
      set (value) {
        if (value && !this.noIsoString) {
          try {
            const isoString = new Date(value).toISOString();
            this.$emit("update:modelValue", isoString);
          } catch (e) {
            console.error(e);
            this.$emit("update:modelValue", value);
          }
        } else {
          this.$emit("update:modelValue", value);
        }
      },
    },

  },

  setup (props, { slots }) {
    const selectedDate = date.formatDate(props.modelValue, "YYYY/MM/DD");
    const currentDate = date.formatDate(new Date(), "YYYY/MM/DD");

    function options (date) {
      return date === selectedDate || date >= currentDate;
    }

    return {
      slots: useSlots(slots).filter(({ name }) => name !== "append"),
      selectedDate,
      currentDate,
      filterOptions: props.options ?? options,
    };
  },
};
</script>

<style scoped>
</style>

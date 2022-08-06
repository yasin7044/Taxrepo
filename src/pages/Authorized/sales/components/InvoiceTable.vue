<template>
  <div>
    <q-table
      table-header-class="table-header"
      v-bind="$attrs"
      :columns="InvoiceHeader"
      row-key="index"
      :rows="rowModel"
      bordered
      no-pagination
      hide-bottom
    >
      <template #body-cell-qty="props">
        <q-td :props="props">
          <div class="my-table-details">
            <BaseInput
              v-model.number="props.row.quantity"
              type="number"
              box
              @update:modelValue="calculationChangeQuantity(props)"
            />
          </div>
        </q-td>
      </template>
      <template #body-cell-rate="props">
        <q-td :props="props">
          <div class="my-table-details">
            <BaseInput
              v-model="props.row.rate"
              type="number"
              @update:modelValue="calculationChangeRate(props)"
            />
          </div>
        </q-td>
      </template>
      <template #body-cell-amount="props">
        <q-td :props="props">
          <div class="my-table-details">
            <BaseInput
              v-model="props.row.amount"
              type="number"
              @update:modelValue="calculationAmount(props)"
              box
            />
          </div>
        </q-td>
      </template>
      <template #body-cell-GST="props">
        <q-td :props="props">
          <div class="my-table-details">
            <BaseSelect
              :options="[0, 5, 12, 18, 28]"
              v-model="props.row.tax_rate"
              @update:modelValue="calculationTaxRate(props)"
              outlined
            />
          </div>
        </q-td>
      </template>
      <template #body-cell-discount="props">
        <q-td :props="props">
          <div class="row">
            <BaseInput
              v-model="props.row.discount_rate"
              type="number"
              box
              @update:modelValue="calculationDiscountRate(props)"
              style="width:100px"
              class="q-mr-md"
              :max="100"
            >
              <template v-slot:append>
                %
              </template>
            </BaseInput>
            <BaseInput
              v-model="props.row.discount_amount"
              type="number"
              box
              @update:modelValue="calculationDiscountAmount(props)"
              style="width:100px"
            />
          </div>
        </q-td>
      </template>
      <template #body-cell-net_amount="props">
        <q-td :props="props">
          <div class="my-table-details">
            {{ props.row.net_amount }}
            <q-btn
              icon="delete"
              color="red"
              flat
              @click="removeRow(props.row)"
            />

          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import BaseTable from "src/components/BaseTable.vue";
import { computed } from "vue-demi";
import BaseInput from "src/components/BaseInput.vue";
import BaseSelect from "src/components/BaseSelect.vue";

const InvoiceHeader = [
  {
    name: "index",
    label: "S1.no",
    field: "pageIndex",
  },
  {
    name: "Item Name",
    label: "Item Name",
    field: "item_name",
    sortable: true,
    align: "left",
  },
  {
    name: "qty",
    label: "QTY",
    field: "quantity",
    sortable: true,
    align: "left",
  },
  {
    name: "rate",
    label: "Rate@",
    field: "rate",
    sortable: true,
    align: "left",
  },
  {
    name: "amount",
    label: "Amount",
    field: "amount",
    sortable: true,
    align: "left",
  },
  {
    name: "GST",
    label: "GST",
    field: "tax_rate",
    sortable: true,
    align: "left",
  },
  {
    name: "discount",
    label: "Discount",
    field: "discount_rate",
    sortable: true,
    align: "left",
  },
  {
    name: "net_amount",
    label: "Net Amount",
    field: "net_amount",
    sortable: true,
    align: "right",
  },
];

export default {
  BaseTable,
  components: {
    BaseInput,
    BaseSelect
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup (props, { emit }) {
    const rowModel = computed({
      get () {
        return props.modelValue;
      },
      set (value) {
        console.log;
        console.log(value);
        emit("update:modelValue", value);
      },
    });
    return {
      InvoiceHeader,
      rowModel,
    };
  },
  methods: {
    calculationDiscountRate (props) {
      this.$nextTick(() => {

        props.row.discount_amount = props.row.amount * (props.row.discount_rate / 100);
        // props.row.net_amount = props.row.amount - props.row.discount_amount;
        props.row.tax_amount = props.row.net_amount * (props.row.tax_rate / 100);
        props.row.net_amount = props.row.net_amount + props.row.tax_amount;



      })

    },
    calculationChangeQuantity (props) {
      this.$nextTick(() => {

        props.row.amount = props.row.quantity * props.row.rate;
        props.row.discount_amount = props.row.amount * (props.row.discount_rate / 100);
        props.row.net_amount =
          props.row.amount -
          props.row.discount_amount -
          (props.row.tax_rate / 100) * props.row.amount;
      })
    },
    calculationChangeRate (props) {
      this.$nextTick(() => {

        props.row.amount = props.row.quantity * props.row.rate;
        props.row.discount_amount = props.row.amount * (props.row.discount_rate / 100);
        props.row.net_amount =
          props.row.amount -
          props.row.discount_amount -
          (props.row.tax_rate / 100) * props.row.amount;
      })
    },
    calculationAmount (props) {
      this.$nextTick(() => {

        // props.row.amount = props.row.quantity * props.row.rate;
        props.row.rate = props.row.amount / props.row.quantity;
        props.row.discount_amount = props.row.amount * (props.row.discount_rate / 100);
        props.row.net_amount =
          props.row.amount -
          props.row.discount_amount -
          (props.row.tax_rate / 100) * props.row.amount;
      })
    },
    calculationDiscountAmount (props) {
      this.$nextTick(() => {

        props.row.amount = props.row.quantity * props.row.rate;
        props.row.discount_rate = props.row.discount_amount / props.row.amount * 100;
        props.row.net_amount =
          props.row.amount -
          props.row.discount_amount -
          (props.row.tax_rate / 100) * props.row.amount;
      })
    },

    calculationTaxRate (props) {
      this.$nextTick(() => {

        props.row.net_amount =
          props.row.amount -
          props.row.discount_amount -
          (props.row.tax_rate / 100) * props.row.amount;
      })
    },
    removeRow (row) {
      this.rowModel.splice(this.rowModel.indexOf(row), 1);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

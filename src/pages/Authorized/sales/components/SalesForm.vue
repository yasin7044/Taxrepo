<template>

  <q-card
    bordered
    flat
    class="q-pa-lg q-mt-lg"
  >

    <q-form ref="salesForm">
      <div class="row q-col-gutter-md">
        <div class="col-3">
          <BaseSelect
            label="Voucher Type:"
            v-model="invoiceBilling.voucher_type"
            :options="voucherList"
            tabindex="1"
            :error="v$.voucher_type.$error"
            :error-message="v$.voucher_type.required.$message"
          />

          <!-- {{v$.voucher_type}} -->
        </div>
        <div class="col-3">
          <BaseInput
            label="Issue Date:"
            type="Date"
            v-model="invoiceBilling.issue_date"
            tabindex="2"
          />
        </div>
        <div class="col-3">
          <BaseInput
            label="Due Date:"
            type="Date"
            v-model="invoiceBilling.due_date"
            tabindex="3"
          />
        </div>
        <div class="col-3">
          <BaseInput
            label="Invoice Number:"
            v-model="invoiceBilling.invoice_number"
            tabindex="4"
            :error="v$.invoice_number.$error"
            :error-message="v$.invoice_number.required.$message"
          />
        </div>
        <div class="col-3">
          <BaseSelect
            label="Account Type:"
            v-model="invoiceBilling.account_type"
            :options="accountType"
            tabindex="5"
          />
        </div>
        <div class="col-3">
          <BaseSelect
            label="Account Type:"
            v-model="invoiceBilling.bill_to_user"
            :options="billTo"
            tabindex="6"
          />
        </div>
        <div class="col-3">
          <BaseInput
            label="Location:"
            v-model="invoiceBilling.location"
            tabindex="7"
            :error="v$.location.$error"
            :error-message="v$.location.required.$message"
          />
        </div>
      </div>
      <BaseSelect
        class="q-mt-lg w-half"
        :options="getInvoiceData"
        :option-label="item =>item.item_name"
        v-model="selectInvoice"
        @update:modelValue="addInvoice"
        label="Search Invoice Item Here"
        placeholder="Search"
        tabindex="8"
      />
      <q-btn
        class="q-mt-lg"
        @click="$emit('openInvoiceModal', true)"
      >Add New Invoice</q-btn>
    </q-form>
    <InvoiceTable
      class="q-mt-lg"
      v-model="invoiceBilling.invoices"
    />

    <div class="row justify-end">
      <q-btn
        type="submit"
        label="Save"
        class="q-mt-md"
        color="teal"
        @click="saveInvoice"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>

  </q-card>
</template>

<script>
import BaseInput from "src/components/BaseInput.vue";
import BaseSelect from "src/components/BaseSelect.vue";
import useInvoiceForm from "src/composables/forms/use-invoice";
import InvoiceTable from "./InvoiceTable.vue";
import { ref } from 'vue';
// import BaseSelect from "src/components/BaseSelect.vue";
import { mapGetters, mapMutations } from "vuex";
const voucherList = [
  "Invoice",
  "Credit Note",
  "Debit Note",
  "Receipt",
  "Payment",
  "Journal",
  "General Ledger",
  "Sales Order",
  "Purchase Order",
  "Purchase Invoice",
  "Purchase Credit Note",
  "Purchase Debit Note",
];

const accountType = [
  "Sales A/C",
  "Purchase A/C",
  "Inventory A/C",
  "Bank A/C",
  "Cash A/C",
  "Cost of Goods A/C",
  "Other A/C",
];
const billTo = ["Customer", "Supplier", "Employee", "Other"];


export default {
  components: {
    BaseInput,
    BaseSelect,
    InvoiceTable,
    BaseSelect
  },
  emits: ['invoiceItemDialog'],
  setup () {
    const selectInvoice = ref(null);
    const invoiceItemDialog = ref(false);
    return {
      voucherList,
      accountType,
      billTo,
      ...useInvoiceForm(),
      selectInvoice,
      invoiceItemDialog
    };
  },
  emits: ['closeSalesDialog'],
  methods: {
    ...mapMutations('Buisness', ['addNewSales']),
    addInvoice (value) {
      this.invoiceBilling.invoices.push(value);
      this.selectInvoice = null;
    },
    saveInvoice () {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }
      this.addNewSales(this.invoiceBilling);
      this.$emit('closeSalesDialog', false);
    }
  },
  computed: {
    ...mapGetters('Buisness', ['getInvoiceData'])
  }
};
</script>

import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { date } from "quasar";
const initializeInvoiceBiling = {
  voucher_type: "Invoice",
  issue_date: date.formatDate(new Date(), "YYYY-MM-DD"),
  due_date: date.formatDate(new Date(), "YYYY-MM-DD"),
  invoice_number: "",
  account_type: "Sales A/C",
  bill_to_user: "Customer",
  location: "Kolkata",
  invoices: [
    {
      item_name: "OPPO",
      quantity: 1,
      rate: 1000,
      amount: 1000,
      tax_rate: 5,
      discount_rate: 5,
      discount_amount: 50,
      net_amount: 950,
    },
  ],
};

export default function useInvoiceForm() {
  const invoiceBilling = reactive(initializeInvoiceBiling);
  const loading = ref(false);

  const validationsRules = {
    voucher_type: {
      required: helpers.withMessage("Voucher Type is required", required),
    },
    issue_date: {
      required: helpers.withMessage("Issue Date is required", required),
    },
    due_date: {
      required: helpers.withMessage("Due Date is required", required),
    },
    invoice_number: {
      required: helpers.withMessage("Invoice Number is required", required),
    },
    account_type: {
      required,
    },
    account_type: {
      required: helpers.withMessage("account_type is required", required),
    },
    bill_to_user: {
      required: helpers.withMessage("bill_to_user is required", required),
    },
    location: {
      required: helpers.withMessage("location is required", required),
    },
  };

  const v$ = useVuelidate(validationsRules, invoiceBilling, {
    $autoDirty: true,
  });

  return {
    invoiceBilling,
    v$,
    loading,
  };
}

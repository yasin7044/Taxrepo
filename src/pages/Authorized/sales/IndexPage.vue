<template>
  <q-page-container>
    <q-page class="q-pa-lg">
      <div class="row justify-between items-center">

        <div>
          <q-btn
            color="primary"
            label="Sales"
            icon="add"
          />
        </div>

        <div>
          <q-btn
            outline
            icon="download"
            class="q-mr-md"
          />
          <q-btn
            outline
            icon="add"
            label="Sales Return"
            class="q-mr-md"
          />
          <q-btn
            outline
            icon="add"
            label="Invoice"
            @click="salesDialog = true"
          />
        </div>

      </div>

      <pre> {{getSales}}</pre>
    </q-page>

    <q-dialog
      v-model="salesDialog"
      full-width
      title="Create Invoice"
      no-backdrop-dismiss
    >
      <q-card class="q-pa-lg">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create Invoice</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>

        <q-card-section>
          <SalesForm
            @openInvoiceModal="invoiceItemDialog = true"
            @closeSalesDialog="salesDialog = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="invoiceItemDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >

      <q-card style="width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create Sales Item</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>
        <q-card-section>
          <InvoiceForm @closeInvoiceDialog="invoiceItemDialog = false" />
          />
        </q-card-section>

      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<script>
import SalesForm from "./components/SalesForm.vue"
import { ref } from "vue"
import InvoiceForm from "./components/InvoiceForm.vue"
import { mapGetters } from "vuex"
export default {
  components: {
    SalesForm,
    InvoiceForm
  },
  setup () {
    const salesDialog = ref(false)
    const invoiceItemDialog = ref(false);

    return {
      salesDialog,
      invoiceItemDialog
    }
  },
  computed: {
    ...mapGetters('Buisness', ['getSales'])
  }

}
</script>

<style lang="scss" scoped>
</style>

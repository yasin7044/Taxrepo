<template>
  <q-card
    bordered
    flat
    class="q-pa-lg q-mt-lg"
  >
    <q-form ref="salesForm">
      <BaseInput
        label="Invoice Item Name:"
        v-model="item_name"
        tabindex="4"
      />
      <q-btn
        class="q-mt-lg"
        label="Save"
        @click="saveNewItemInvoice"
        :loading="loading"
      >

      </q-btn>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import BaseInput from "src/components/BaseInput.vue";
export default {
  components: { BaseInput },
  data () {
    return {
      item_name: '',
      loading: false
    }
  },
  emits: ['closeInvoiceDialog'],
  methods: {
    ...mapActions('Buisness', ['addNewItemInvoice']),
    async saveNewItemInvoice () {
      console.log('hi')
      if (!this.item_name) return
      this.loading = true
      await this.addNewItemInvoice(this.item_name)
      this.item_name = ''
      this.$emit('closeInvoiceDialog', false)
      this.loading = false
    }
  }

}
</script>

<style lang="scss" scoped>
</style>

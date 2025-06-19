<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import Confirmation from '@/components/confirmation/Confirmation.vue'
import CustomerTable from '@/components/customer-table/index.vue'

import { useConfirmationService, useToastService } from '@/composables/useUIFeedback'

import { CustomerService } from '@/services/customerService'

import { type Customer } from '@/types'

import { useCustomerStore } from '@/stores/customerStore'

/* Composables */
const toast = useToastService()
const confirm = useConfirmationService()

/* Global states */
const customerStore = useCustomerStore()

/* Reactive states */
const customers = reactive<Customer[]>([])
const loading = ref<boolean>(true)

/* Event Handlers */
// Handle delete customer
const onDelete = async (id: string, name: string) => {
  const decision = await confirm.danger(`Do you want to delete ${name}`)
  // if user reject, show reject toast and close confirmation
  if (!decision) {
    toast.warn('Rejected', `Delete cancelled for ${name}`)
    return
  }
  // else delete customer
  const { success, error } = await CustomerService.deleteCustomer(id)
  if (!success) {
    toast.danger('Delete failed', error ?? 'Unexpected error occurred')
    return
  }
  toast.success('Confirmed', `Deleted ${name}`)
  // refetch data after deleting
  const result = await CustomerService.getCustomers(0)
  if (!result.success) {
    return
  }
  customers.splice(0, customers.length, ...result.data)
}
// handle refetch customers data
const onPage = async () => {
  loading.value = true
  await customerStore.fetchCustomers(true)
  loading.value = false
}

/* Lifecycle Hooks */
onMounted(async () => {
  await customerStore.fetchCustomers()
  loading.value = false
})
</script>

<template>
  <Confirmation />
  <CustomerTable
    @delete="onDelete"
    @page="onPage"
    :customers="customerStore.customers"
    :table-meta="customerStore.tableMeta"
    v-model:loading="loading"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Confirmation from '@/components/confirmation/Confirmation.vue'
import CustomerTable from '@/components/customer-table/index.vue'

import { useConfirmationService, useToastService } from '@/composables/useUIFeedback'

import { CustomerService } from '@/services/customerService'

import { useCustomerStore } from '@/stores/customerStore'

/* Composables */
const toast = useToastService()
const confirm = useConfirmationService()

/* Global states */
const store = useCustomerStore()

/* Reactive states */
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
  // refetch data after deleting
  store.fetchCustomers(true)
  toast.success('Confirmed', `Deleted ${name}`)
}
// handle refetch customers data
const onPage = async () => {
  loading.value = true
  await store.fetchCustomers(true)
  loading.value = false
}

/* Lifecycle Hooks */
onMounted(async () => {
  await store.fetchCustomers()
  loading.value = false
})
</script>

<template>
  <Confirmation />
  <CustomerTable
    @delete="onDelete"
    @page="onPage"
    :customers="store.customers"
    :table-meta="store.tableMeta"
    v-model:loading="loading"
  />
</template>

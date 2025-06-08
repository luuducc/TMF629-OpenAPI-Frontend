<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

import Confirmation from '@/components/confirmation/Confirmation.vue'
import CustomerTable from '@/components/customer-table/index.vue'

import { useConfirmationService, useToastService } from '@/composables/useUIFeedback'

import { CustomerService } from '@/services/customerService'

import { type Customer, type PaginationMeta } from '@/types'

/* Composables */
const toast = useToastService()
const confirm = useConfirmationService()

/* Reactive states */
const customers = reactive<Customer[]>([])
const tableMeta = reactive<PaginationMeta>({
  offset: 0,
  pageCount: 0,
  total: 0,
})
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
  // fetch new customers data
  const result = await CustomerService.getCustomers(tableMeta.offset, tableMeta.limit)
  if (result.success) {
    const { paginationMeta } = result
    // update table meta
    Object.assign(tableMeta, paginationMeta)
    // update customers data
    customers.splice(0, customers.length, ...result.data)
    loading.value = false
  }
}

/* Watchers */
// triggers onPage on every tableMeta change
watch(() => tableMeta, onPage, { deep: true })

/* Lifecycle Hooks */
// fetch customers data when components is mounted
onMounted(async () => {
  const result = await CustomerService.getCustomers(0)
  if (result.success) {
    const { paginationMeta } = result
    // update table meta
    Object.assign(tableMeta, paginationMeta)
    // update customers reactive
    customers.splice(0, customers.length, ...result.data)
    loading.value = false
  }
})
</script>

<template>
  <Confirmation />
  <CustomerTable @delete="onDelete" :customers="customers" :table-meta="tableMeta" v-model:loading="loading" />
</template>

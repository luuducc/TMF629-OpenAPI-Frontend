<script setup lang="ts">
import type { DataTableFilterMeta, DataTableFilterMetaData, DataTableSortMeta } from 'primevue'

import { FilterMatchMode } from '@primevue/core/api'

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
const filters = ref<DataTableFilterMeta>({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  'engagedParty.@referredType': {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
})

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
// handle table filtering
const onFilter = async () => {
  store.nameFilter = (filters.value.name as DataTableFilterMetaData).value
  store.statusFilter = (filters.value.status as DataTableFilterMetaData).value
  store.partyFilter = (filters.value['engagedParty.@referredType'] as DataTableFilterMetaData).value
  await store.fetchCustomers(true)
}
// handle table sorting
const onSort = async (e: DataTableSortMeta[]) => {
  let sort = ''
  e.forEach(({ field, order }) => {
    if (field === 'name') {
      sort += (order === 1 ? '' : '-') + 'name,'
    }
    if (field === 'status') {
      sort += (order === 1 ? '' : '-') + 'status,'
    }
    if (field === 'engagedParty.@referredType') {
      sort += (order === 1 ? '' : '-') + 'engagedParty.referredType,'
    }
  })
  // remote the last ','
  sort = sort.slice(0, -1)
  store.sort = sort
  await store.fetchCustomers(true)
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
    @filter="onFilter"
    @sort="onSort"
    :customers="store.customers"
    :table-meta="store.tableMeta"
    v-model:filters="filters"
    v-model:loading="loading"
  />
</template>

<script setup lang="ts">
import { Toast } from 'primevue'

import { onMounted, reactive, ref } from 'vue'

import Confirmation from '@/components/confirmation/Confirmation.vue'
import CustomerDialog from '@/components/customer-dialog'
import CustomerTable from '@/components/customer-table'
import { CustomerFormMode, defaultCustomer, type Customer } from '@/types'

import {
  useConfirmationService,
  useToastService,
} from '@/composables/useUIFeedback'
import { CustomerService } from '@/services/customerService'

/* Composables */
const toast = useToastService()
const confirm = useConfirmationService()

/* Reactive states */
const customers = reactive<Customer[]>([])
const customer = reactive<Customer>(structuredClone(defaultCustomer))
const visible = ref<boolean>(false)
const formMode = ref<CustomerFormMode>(CustomerFormMode.View)

/* Event Handlers */
const handleCreated = async () => {
  // refetch data after creating
  const data = await CustomerService.getCustomers()
  customers.splice(0, customers.length, ...data)
}
const handleUpdated = async () => {
  // refetch data after creating
  const data = await CustomerService.getCustomers()
  customers.splice(0, customers.length, ...data)
}
const handleCreateCustomer = () => {
  // open dialog
  visible.value = true
  // set form mode to create
  formMode.value = CustomerFormMode.Create
}
const handleViewCustomer = async (id: string) => {
  // fetch customer detail information
  const { success, data } = await CustomerService.getCustomerById(id)
  if (!success) return
  Object.assign(customer, data)
  formMode.value = CustomerFormMode.View
  visible.value = true
}
const handleUpdateCustomer = async (id: string) => {
  // fetch customer detail information
  const { success, data } = await CustomerService.getCustomerById(id)
  if (!success) return
  Object.assign(customer, data)
  formMode.value = CustomerFormMode.Update
  visible.value = true
}
const handleDeleteCustomer = async (id: string, name: string) => {
  const decision = await confirm.danger(`Do you want to delete ${name}`)
  // if user reject, show reject toast and close confirmation
  if (!decision) {
    toast.warn('Rejected', `Delete cancelled for ${name}`)
    return
  }
  // else delete customer
  const { success, error } = await CustomerService.deleteCustomer(id)
  if (success) {
    toast.success('Confirmed', `Deleted ${name}`)
    // refetch data after deleting
    const data = await CustomerService.getCustomers()
    customers.splice(0, customers.length, ...data)
  } else {
    toast.danger('Delete failed', error ?? 'Unexpected error occurred')
  }
}

/* Lifecycle Hooks */
onMounted(async () => {
  // fetch customer data
  const data = await CustomerService.getCustomers()
  customers.splice(0, customers.length, ...data)
})
</script>

<template>
  <h1>This is the main view</h1>
  <Toast />
  <Confirmation />
  <CustomerTable
    @create="handleCreateCustomer"
    @view="handleViewCustomer"
    @update="handleUpdateCustomer"
    @delete="handleDeleteCustomer"
    :customers="customers"
  />
  <CustomerDialog
    @created="handleCreated"
    @updated="handleUpdated"
    v-model:visible="visible"
    :form-mode="formMode"
    :initial-value="customer"
  />
</template>

<script setup lang="ts">
import { ProgressSpinner } from 'primevue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import CustomerForm from '@/components/customer-form/index.vue'
import ViewHeader from '@/components/layout/ViewHeader.vue'

import { useToastService } from '@/composables/useUIFeedback'
import useVueRouter from '@/composables/useVueRouter'

import { CustomerService } from '@/services/customerService'

import { type Customer } from '@/types'

/* Composables */
const route = useRoute()
const id = route.params.id as string
const { navigateBack } = useVueRouter()
const toast = useToastService()

/* Reactive states */
const customer = ref<Customer>()

/* Event Handlers */
// Handle update customer
const onUpdate = async () => {
  if (!customer.value) return
  const { success, error } = await CustomerService.patchCustomer(id, customer.value)
  if (success) {
    // show success toast
    toast.success('Success', 'Update customer successfully')
    // go back to Home view
    navigateBack()
    return
  }
  // else show error toast
  toast.danger('Error', error ?? 'An unknown error occurred')
  console.log('updated', customer.value)
}

/* Lifecycle Hooks */
// Fetch customer details to prefill form when component is mounted
onMounted(async () => {
  const result = await CustomerService.getCustomerById(id)
  if (result.success) {
    customer.value = result.data
    return
  }
})
</script>
<template>
  <ViewHeader title="Edit customer information" :id mode="edit" />
  <CustomerForm v-if="customer" @update="onUpdate" is-edit v-model="customer" />
  <div v-else class="w-full flex justify-center">
    <ProgressSpinner style="width: 40px; height: 40px" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import CustomerForm from '@/components/customer-form/index.vue'
import ViewHeader from '@/components/layout/ViewHeader.vue'

import { useToastService } from '@/composables/useUIFeedback'
import useVueRouter from '@/composables/useVueRouter'

import { CustomerService } from '@/services/customerService'

import { defaultCustomer, type Customer } from '@/types'

/* Composables */
const { navigateHome } = useVueRouter()
const toast = useToastService()

/* Reactive states */
const customer = reactive<Customer>(structuredClone(defaultCustomer))
const loading = ref<boolean>(false)

/* Event Handlers */
// Handle create customer
const onCreate = async () => {
  loading.value = true
  const { success, error } = await CustomerService.createCustomer(customer)
  loading.value = false
  if (success) {
    // show success toast
    toast.success('Success', 'New customer has been created!')
    // return to main view
    navigateHome()
    return
  }
  // else show error toast
  toast.danger('Error', error ?? 'An unknown error occurred')
}
</script>
<template>
  <ViewHeader title="Create new customer" v-model:loading="loading" />
  <CustomerForm @create="onCreate" v-model="customer" />
</template>

<script setup lang="ts">
import { ProgressSpinner } from 'primevue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import CustomerInfo from '@/components/customer-info/index.vue'
import ViewHeader from '@/components/layout/ViewHeader.vue'

import { CustomerService } from '@/services/customerService'

import { type Customer } from '@/types'

/* Composables */
const route = useRoute()
const id = route.params.id as string

/* Reactive states */
const customer = ref<Customer>()

/* Lifecycle Hooks */
// Fetch customer details to display when component is mounted
onMounted(async () => {
  const result = await CustomerService.getCustomerById(id)
  if (result.success) {
    customer.value = result.data
    return
  }
})
</script>
<template>
  <ViewHeader title="Detail information" :id mode="view"/>
  <CustomerInfo v-if="customer" :customer="customer" />
  <div v-else class="w-full flex justify-center">
    <ProgressSpinner style="width: 40px; height: 40px" />
  </div>
</template>

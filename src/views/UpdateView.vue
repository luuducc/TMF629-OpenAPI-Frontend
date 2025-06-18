<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import CustomerForm from '@/components/customer-form/index.vue'
import ViewHeader from '@/components/layout/ViewHeader.vue'

import { useToastService } from '@/composables/useUIFeedback'
import useVueRouter from '@/composables/useVueRouter'

import { useCustomerStore } from '@/stores/customerStore'

/* Global states */
const store = useCustomerStore()

/* Composables */
const route = useRoute()
const id = route.params.id as string
const { navigateBack } = useVueRouter()
const toast = useToastService()

/* Reactive states */
const loading = ref<boolean>(true)

/* Event Handlers */
// Handle update customer
const onUpdate = async () => {
  loading.value = true
  const result = await store.updateCustomer(id)
  loading.value = false
  if (result.success) {
    // show success toast
    toast.success('Success', 'Update customer successfully')
    store.resetLoaded()
    // go back to previous view
    navigateBack()
    return
  }
  // else show error toast
  toast.danger('Error', result.error ?? 'An unknown error occurred')
}

/* Lifecycle Hooks */
// Fetch customer details to prefill form when component is mounted
onMounted(async () => {
  await store.fetchCustomer(id)
  loading.value = false
})
</script>
<template>
  <ViewHeader title="Edit customer information" :id mode="edit" v-model:loading="loading" />
  <CustomerForm v-if="!loading && store.customer" @update="onUpdate" is-edit v-model="store.customer" />
  <p v-if="!loading && !store.customer" class="ml-5">Data not found</p>
</template>

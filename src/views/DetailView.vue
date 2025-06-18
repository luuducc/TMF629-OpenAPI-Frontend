<script setup lang="ts">
import { ProgressSpinner } from 'primevue'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import CustomerInfo from '@/components/customer-info/index.vue'
import ViewHeader from '@/components/layout/ViewHeader.vue'

import { useCustomerStore } from '@/stores/customerStore'

/* Composables */
const route = useRoute()
const id = route.params.id as string

/* Global states */
const store = useCustomerStore()

/* Reactive states */
const loading = ref<boolean>(true)

/* Lifecycle Hooks */
// Fetch customer details to display when component is mounted
onMounted(async () => {
  await store.fetchCustomer(id)
  loading.value = false
})
</script>
<template>
  <ViewHeader title="Detail information" :id mode="view" />
  <div v-if="loading" class="w-full flex justify-center">
    <ProgressSpinner style="width: 40px; height: 40px" />
  </div>
  <CustomerInfo v-else-if="store.customer" :customer="store.customer" />
  <p v-else class="ml-5">Data not found</p>
</template>

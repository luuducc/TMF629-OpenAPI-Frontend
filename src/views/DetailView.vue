<script setup lang="ts">
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
  <ViewHeader title="Detail information" :id mode="view" v-model:loading="loading" />
  <CustomerInfo v-if="!loading && store.customer" :customer="store.customer" />
  <p v-if="!loading && !store.customer" class="ml-5">Data not found</p>
</template>

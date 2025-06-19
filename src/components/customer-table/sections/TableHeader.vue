<script setup lang="ts">
import { IconField, InputIcon, InputText } from 'primevue'

import { useCustomerStore } from '@/stores/customerStore'

const store = useCustomerStore()
const onInput = async () => {
  await store.fetchCustomers(true)
}
</script>
<template>
  <IconField>
    <InputIcon class="pi pi-search" />
    <InputText :oninput="onInput" v-model="store.keyword" placeholder="Keyword Search" size="small" />
  </IconField>
</template>

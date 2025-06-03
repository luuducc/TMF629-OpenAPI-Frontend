<script setup lang="ts">
import { InputText } from 'primevue'

import { CustomerFormMode } from '@/types'

defineProps<{
  formMode: CustomerFormMode
  readonly: boolean
}>()
const customerName = defineModel<string>('customerName')
const customerId = defineModel<string>('customerId')
</script>
<template>
  <!-- Customer Basic Info -->
  <div class="flex gap-4">
    <!-- Customer Name -->
    <div class="flex flex-col flex-1 gap-1">
      <label class="font-medium" for="customerName">Name</label>
      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ customerName }}</p>
      <InputText
        v-else
        v-model="customerName"
        size="small"
        placeholder="Customer name"
        id="customerName"
      />
    </div>
    <!-- Customer ID -->
    <div
      v-if="formMode !== CustomerFormMode.Create"
      class="flex flex-col flex-1 gap-1"
    >
      <label class="font-medium" for="customerId">Id</label>
      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ customerId }}</p>
      <InputText
        v-else
        v-model="customerId"
        disabled
        size="small"
        placeholder="Customer Id"
        id="customerId"
      />
    </div>
  </div>
</template>

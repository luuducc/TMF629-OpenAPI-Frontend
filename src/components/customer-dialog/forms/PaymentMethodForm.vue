<script setup lang="ts">
import { InputText, Select } from 'primevue'

import { paymentOptions, type PaymentMethodRef } from '@/types'

defineProps<{ readonly: boolean }>()
const paymentMethod = defineModel<PaymentMethodRef>({ required: true })
</script>

<template>
  <div class="flex gap-4">
    <!-- Method Name -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="methodName">Name</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ paymentMethod.name }}</p>
      <InputText
        v-else
        v-model="paymentMethod.name"
        size="small"
        placeholder="Enter method name"
        id="methodName"
      />
    </div>
    <!-- Method Type -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="methodType">Referred type</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ paymentMethod['@referredType'] }}
      </p>
      <Select
        v-else
        v-model="paymentMethod['@referredType']"
        :options="paymentOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a method type"
        id="methodType"
      />
    </div>
  </div>
</template>

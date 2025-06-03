<script setup lang="ts">
import { InputText, Select, Tag } from 'primevue'

import { getStatusSeverity, statusOptions, StatusType } from '@/types'

const status = defineModel<StatusType>('status')
const statusReason = defineModel<string>('statusReason')
defineProps<{ readonly: boolean }>()
</script>
<template>
  <div class="flex gap-4">
    <!-- Customer Status -->
    <div class="flex flex-col flex-1 gap-1">
      <label class="font-medium" for="customerStatus">Status</label>
      <!-- Render plain text for readonly mode, input field for editing -->
      <Tag
        v-if="readonly"
        :value="status"
        :severity="getStatusSeverity(status)"
        style="
          width: fit-content;
          height: 100%;
          border: 0.2px solid var(--p-inputtext-border-color);
        "
      />
      <Select
        v-else
        v-model="status"
        :options="statusOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a customer status"
        id="customerStatus"
      >
        <template #value="slotProps">
          <Tag
            :value="slotProps.value"
            :severity="getStatusSeverity(slotProps.value)"
            class="text-red"
            style="
              height: 1.3rem;
              border: 0.2px solid var(--p-inputtext-border-color);
            "
          />
        </template>
        <template #option="slotProps">
          <Tag
            :value="slotProps.option.name"
            :severity="getStatusSeverity(slotProps.option.name)"
            style="
              height: 1.5rem;
              border: 0.2px solid var(--p-inputtext-border-color);
            "
          />
        </template>
      </Select>
      <!-- <Tag
        v-else
        v-model="customer.status"
        :value="customer.status"
        :severity="getSeverity(customer.status)"
        style="
          width: fit-content;
          height: 100%;
          border: 0.2px solid var(--p-inputtext-border-color);
        "
      /> -->
    </div>
    <!-- Customer Status Reason -->
    <div class="flex flex-col flex-1 gap-1">
      <label class="font-medium" for="customerStatusReason"
        >Status reason</label
      >
      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ statusReason }}</p>
      <InputText
        v-else
        v-model="statusReason"
        size="small"
        id="customerStatusReason"
      />
    </div>
  </div>
</template>

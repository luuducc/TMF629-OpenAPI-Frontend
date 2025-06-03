<script setup lang="ts">
import { DatePicker } from 'primevue'

import type { TimePeriod } from '@/types'

const initialValue = defineModel<TimePeriod>({ required: true })
defineProps<{ readonly: boolean }>()
</script>
<template>
  <div class="flex flex-col">
    <label class="font-medium">Valid for</label>
    <div class="flex gap-4">
      <div class="flex flex-col flex-1 gap-1">
        <label class="text-sm font-medium" for="startDate">Start date</label>
        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ initialValue.startDateTime.toLocaleDateString() }}
        </p>
        <DatePicker
          v-else
          v-model="initialValue.startDateTime"
          size="small"
          id="startDate"
        />
      </div>
      <div class="flex flex-col flex-1 gap-1">
        <label class="text-sm font-medium" for="endDate">End date</label>
        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ initialValue.endDateTime.toLocaleDateString() }}
        </p>
        <DatePicker
          v-else
          v-model="initialValue.endDateTime"
          size="small"
          id="endDate"
        />
      </div>
    </div>
  </div>
</template>

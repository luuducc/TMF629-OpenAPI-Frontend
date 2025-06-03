<script setup lang="ts">
import { DatePicker, InputNumber } from 'primevue'

import type { CreditProfile } from '@/types'

defineProps<{ readonly: boolean }>()
const creditProfile = defineModel<CreditProfile>({ required: true })
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <!-- Profile Date -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="profileDate">Profile date</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ creditProfile.creditProfileDate.toLocaleDateString() }}
      </p>
      <DatePicker
        v-else
        v-model="creditProfile.creditProfileDate"
        size="small"
        id="profileDate"
      />
    </div>
    <br/>
    <!-- Risk Rating -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="riskRating">Risk rating</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ creditProfile.creditRiskRating }}
      </p>
      <InputNumber
        v-else
        v-model="creditProfile.creditRiskRating"
        size="small"
        id="riskRating"
      />
    </div>
    <!-- Credit Score -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="creditScore">Credit score</label>
      
      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ creditProfile.creditScore }}</p>
      <InputNumber
        v-else
        v-model="creditProfile.creditScore"
        size="small"
        id="creditScore"
      />
    </div>
    <!-- Start Date -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="startDate">Start date</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ creditProfile.validFor.startDateTime.toLocaleDateString() }}
      </p>
      <DatePicker
        v-else
        v-model="creditProfile.validFor.startDateTime"
        size="small"
        id="startDate"
      />
    </div>
    <!-- End Date -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="endDate">End date</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ creditProfile.validFor.endDateTime.toLocaleDateString() }}
      </p>
      <DatePicker
        v-else
        v-model="creditProfile.validFor.endDateTime"
        size="small"
        id="endDate"
      />
    </div>
  </div>
</template>

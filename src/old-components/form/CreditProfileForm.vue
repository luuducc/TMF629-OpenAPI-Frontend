<script setup lang="ts">
import { InputText, DatePicker, InputNumber } from 'primevue';
import type { CreditProfile } from '@/types'

const creditProfile = defineModel<CreditProfile>({ required: true});
defineProps<{ readonly: boolean }>()

</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="profileDate">Profile date</label>
      <DatePicker
        v-if="!readonly"
        v-model="creditProfile.creditProfileDate"
        size="small"
        id="profileDate"
      />
      <p v-else class="text-sm">{{ creditProfile.creditProfileDate.toLocaleDateString() }}</p>
    </div>
    <div></div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="riskRating">Risk rating</label>
      <InputNumber
        v-if="!readonly"
        v-model="creditProfile.creditRiskRating"
        size="small"
        id="riskRating"
      />
      <p v-else class="text-sm">{{ creditProfile.creditRiskRating }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="creditScore">Credit score</label>
      <InputNumber
        v-if="!readonly"
        v-model="creditProfile.creditScore"
        size="small"
        id="creditScore"
      />
      <p v-else class="text-sm">{{ creditProfile.creditScore }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="startDate">Start date</label>
      <DatePicker
        v-if="!readonly"
        v-model="creditProfile.validFor.startDateTime"
        size="small"
        id="startDate"
      />
      <p v-else class="text-sm">{{ creditProfile.validFor.startDateTime.toLocaleDateString() }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="endDate">End date</label>
      <DatePicker
        v-if="!readonly"
        v-model="creditProfile.validFor.endDateTime"
        size="small"
        id="endDate"
      />
      <p v-else class="text-sm">{{ creditProfile.validFor.endDateTime.toLocaleDateString() }}</p>
    </div>
  </div>
</template>
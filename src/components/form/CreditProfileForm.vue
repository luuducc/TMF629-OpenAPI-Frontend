<script setup lang="ts">
import { InputText, DatePicker, InputNumber } from 'primevue';
import type { CreditProfile } from '@/types'

const creditProfile = defineModel<CreditProfile>({ required: true});
defineProps<{ disabled: boolean }>()

</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="profileDate">Profile date</label>
      <DatePicker
        v-model="creditProfile.creditProfileDate"
        :disabled
        size="small"
        id="profileDate"
      />
    </div>
    <div></div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="riskRating">Risk rating</label>
      <InputNumber
        v-model="creditProfile.creditRiskRating"
        :disabled
        size="small"
        id="riskRating"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="creditScore">Credit score</label>
      <InputNumber
        v-model="creditProfile.creditScore"
        :disabled
        size="small"
        id="creditScore"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="startDate">Start date</label>
      <DatePicker
        v-model="creditProfile.validFor.startDateTime"
        :disabled
        size="small"
        id="startDate"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="endDate">End date</label>
      <DatePicker
        v-model="creditProfile.validFor.endDateTime"
        :disabled
        size="small"
        id="endDate"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type CreditProfile } from '@/types'

import { FormGenerator, FormGroup, FormItem } from '../shared'

const { list: profile } = defineProps<{ list: CreditProfile[] }>()
const onAdd = (): void => {
  profile.push({
    creditProfileDate: new Date(),
    creditRiskRating: 0,
    creditScore: 0,
    validFor: {
      startDateTime: new Date(),
      endDateTime: new Date(),
    },
  })
}
</script>
<template>
  <FormGenerator main-label="Credit profiles" sub-label="Profile" :on-add="onAdd" :list="profile">
    <template v-slot="{ index }">
      <div class="grid grid-cols-2 gap-2">
        <FormItem label="Profile date" type="date" v-model:date="profile[index].creditProfileDate" />
        <div></div>
        <FormItem
          label="Risk rating"
          :id="`credit-risk-${index}`"
          type="number"
          v-model:number="profile[index].creditRiskRating"
        />
        <FormItem
          label="Credit score"
          :id="`credit-score-${index}`"
          type="number"
          v-model:number="profile[index].creditScore"
        />
      </div>
      <FormGroup label="Validity period">
        <FormItem label="Start date" type="date" v-model:date="profile[index].validFor.startDateTime" />
        <FormItem label="End date" type="date" v-model:date="profile[index].validFor.endDateTime" />
      </FormGroup>
    </template>
  </FormGenerator>
</template>

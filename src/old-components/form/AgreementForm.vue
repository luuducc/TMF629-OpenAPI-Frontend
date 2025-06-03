<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { AgreementType } from '@/types/agreement-ref';
import type { AgreementRef } from '@/types/agreement-ref';

const options: { name: string, type: AgreementType }[] = 
  Object.values(AgreementType).map(value => ({
    name: value, type: value
  }))
defineProps<{ readonly: boolean }>()

const agreement = defineModel<AgreementRef>({ required: true })
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="agreementName">Name</label>
      <InputText 
        v-if="!readonly"
        v-model="agreement.name" 
        size="small" 
        placeholder="Agreement name"
        id="agreementName" 
      />
      <p v-else class="text-sm">{{ agreement.name }}</p>
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="agreementType">Referred type</label>
      <Select 
        v-if="!readonly"
        v-model="agreement['@referredType']"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select an agreement type"
        id="agreementType" 
      />
      <p v-else class="text-sm">{{ agreement['@referredType'] }}</p>
    </div>
  </div>
</template>
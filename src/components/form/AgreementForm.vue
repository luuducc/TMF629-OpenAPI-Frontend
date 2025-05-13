<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { AgreementType } from '@/types/agreement-ref';
import type { AgreementRef } from '@/types/agreement-ref';

const options: { name: string, type: AgreementType }[] = [
  { name: 'Service', type: AgreementType.ServiceAgreement},
  { name: 'Supplier', type: AgreementType.SupplierAgreement},
]

defineProps<{ disabled: boolean }>()

const agreement = defineModel<AgreementRef>({ required: true })
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="agreementName">Name</label>
      <InputText 
        v-model="agreement.name" 
        :disabled
        size="small" 
        placeholder="Agreement name"
        id="agreementName" 
      />
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="agreementType">Referred type</label>
      <Select 
        v-model="agreement.referredType"
        :disabled
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select an agreement type"
        id="agreementType" 
      />
    </div>
  </div>
</template>
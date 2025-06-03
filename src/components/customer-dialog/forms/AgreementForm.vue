<script setup lang="ts">
import { InputText, Select } from 'primevue'

import { agreementOptions, type AgreementRef } from '@/types'

defineProps<{ readonly: boolean }>()
const agreement = defineModel<AgreementRef>({ required: true })
</script>

<template>
  <div class="flex gap-4">
    <!-- Agreement Name -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="agreementName">Name</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ agreement.name }}</p>
      <InputText
        v-else
        v-model="agreement.name"
        size="small"
        placeholder="Agreement name"
        id="agreementName"
      />
    </div>
    <!-- Agreement Type -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="agreementType"
        >Referred type</label
      >

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ agreement['@referredType'] }}</p>
      <Select
        v-else
        v-model="agreement['@referredType']"
        :options="agreementOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select an agreement type"
        id="agreementType"
      />
    </div>
  </div>
</template>

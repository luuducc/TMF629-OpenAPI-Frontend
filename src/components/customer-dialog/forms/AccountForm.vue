<script setup lang="ts">
import { InputText, Select } from 'primevue'

import { accountOptions, type AccountRef } from '@/types'

defineProps<{ readonly: boolean }>()
const account = defineModel<AccountRef>({ required: true })
</script>

<template>
  <div class="flex gap-4">
    <!-- Account Name -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="accountName">Name</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ account.name }}</p>
      <InputText
        v-model="account.name"
        v-else
        size="small"
        placeholder="Account name"
        id="accountName"
      />
    </div>
    <!-- Account Type -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="accountType">Referred type</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ account['@referredType'] }}</p>
      <Select
        v-model="account['@referredType']"
        v-else
        :options="accountOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select an account type"
        id="accountType"
      />
    </div>
  </div>
</template>

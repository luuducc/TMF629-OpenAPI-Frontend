<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { AccountType } from '@/types/account-ref';
import type { AccountRef } from '@/types';

const options: { name: string, type: AccountType }[] = [
  { name: 'Billing', type: AccountType.BillingAccount},
  { name: 'Settlement', type: AccountType.SettlementAccount},
]

defineProps<{ readonly: boolean }>()

const account = defineModel<AccountRef>({ required: true })
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="accountName">Name</label>
      <InputText 
        v-model="account.name" 
        :readonly
        size="small" 
        placeholder="Account name"
        id="accountName" 
      />
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="accountType">Referred type</label>
      <Select 
        v-if="!readonly"
        v-model="account['@referredType']"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select an account type"
        id="accountType" 
      />
      <InputText
        v-else
        v-model="account['@referredType']"
        readonly
        size="small"
      />
    </div>
  </div>
</template>
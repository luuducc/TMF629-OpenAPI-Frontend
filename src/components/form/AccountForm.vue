<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { AccountType } from '@/types/account-ref';

const options: { name: string, type: AccountType }[] = [
  { name: 'Billing', type: AccountType.BillingAccount},
  { name: 'Settlement', type: AccountType.SettlementAccount},
]

const accountName = defineModel<string>("accountName")
const accountType = defineModel<AccountType>("accountType")
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="accountName">Name</label>
      <InputText 
        v-model="accountName" 
        size="small" 
        placeholder="Account name"
        id="accountName" 
      />
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="accountType">Referred type</label>
      <Select 
        v-model="accountType"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a account type"
        id="accountType" 
      />
    </div>
  </div>
</template>
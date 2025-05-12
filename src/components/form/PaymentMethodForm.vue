<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { PaymentMethodType } from '@/types/payment-method-ref';

const options: { name: string, type: PaymentMethodType }[] = [
  { name: 'Bank account transfer', type: PaymentMethodType.BankAccountTransfer},
  { name: 'Bank card', type: PaymentMethodType.BankCard},
  { name: 'Check', type: PaymentMethodType.Check},
  { name: 'Loyalty', type: PaymentMethodType.Loyalty},
  { name: 'Voucher', type: PaymentMethodType.Voucher},
]

const methodName = defineModel<string>("methodName")
const methodType = defineModel<PaymentMethodType>("methodType")
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="methodName">Name</label>
      <InputText 
        v-model="methodName" 
        size="small" 
        placeholder="Enter method name"
        id="methodName" 
      />
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="methodType">Referred type</label>
      <Select 
        v-model="methodType"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a method type"
        id="methodType" 
      />
    </div>
  </div>
</template>
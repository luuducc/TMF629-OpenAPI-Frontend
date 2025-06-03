<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { PaymentMethodType, type PaymentMethodRef } from '@/types'

const paymentMethod = defineModel<PaymentMethodRef>({ required: true})
defineProps<{ readonly: boolean }>()

const options: { name: string, type: PaymentMethodType }[] = [
  { name: 'Bank account transfer', type: PaymentMethodType.BankAccountTransfer},
  { name: 'Bank card', type: PaymentMethodType.BankCard},
  { name: 'Check', type: PaymentMethodType.Check},
  { name: 'Loyalty', type: PaymentMethodType.Loyalty},
  { name: 'Voucher', type: PaymentMethodType.Voucher},
]

</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="methodName">Name</label>
      <InputText 
        v-if="!readonly"
        v-model="paymentMethod.name" 
        size="small" 
        placeholder="Enter method name"
        id="methodName" 
      />
      <p v-else class="text-sm">{{ paymentMethod.name }}</p>
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="methodType">Referred type</label>
      <Select 
        v-if="!readonly"
        v-model="paymentMethod['@referredType']"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a method type"
        id="methodType" 
      />
      <p v-else class="text-sm">{{ paymentMethod['@referredType'] }}</p>
    </div>
  </div>
</template>
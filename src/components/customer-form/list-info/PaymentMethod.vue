<script setup lang="ts">
import { PaymentMethodType, paymentOptions, type PaymentMethodRef } from '@/types'

import { FormGenerator, FormItem } from '../shared'

const { list: method } = defineProps<{ list: PaymentMethodRef[] }>()
const onAdd = (): void => {
  method.push({
    name: '',
    '@referredType': PaymentMethodType.BankAccountTransfer,
  })
}
</script>
<template>
  <FormGenerator main-label="Payment methods" sub-label="Method" :on-add="onAdd" :list="method">
    <template v-slot="{ index }">
      <div class="flex gap-2">
        <FormItem label="Name" :id="`payment-name-${index}`" v-model:text="method[index].name" />
        <!-- prettier-ignore -->
        <FormItem label="Referred type" type="select" :select-options="paymentOptions"
            v-model:select="method[index]['@referredType']" />
      </div>
    </template>
  </FormGenerator>
</template>

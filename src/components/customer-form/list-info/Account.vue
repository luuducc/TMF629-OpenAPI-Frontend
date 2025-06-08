<script setup lang="ts">
import { accountOptions, AccountType, type AccountRef } from '@/types'

import { FormGenerator, FormItem } from '../shared'

const { list: account } = defineProps<{ list: AccountRef[] }>()
const onAdd = (): void => {
  account.push({
    name: '',
    '@referredType': AccountType.BillingAccount,
  })
}
</script>
<template>
  <FormGenerator main-label="Accounts" sub-label="Account" :on-add="onAdd" :list="account">
    <template v-slot="{ index }">
      <div class="flex gap-2">
        <FormItem label="Name" :id="`account-name-${index}`" v-model:text="account[index].name" />
        <!-- prettier-ignore -->
        <FormItem label="Referred type" type="select" :select-options="accountOptions"
            v-model:select="account[index]['@referredType']" />
      </div>
    </template>
  </FormGenerator>
</template>

<script setup lang="ts">
import { Button } from 'primevue'

import type {
  AccountRef,
  AgreementRef,
  Characteristic,
  ContactMedium,
  CreditProfile,
  PaymentMethodRef,
  RelatedPartyOrPartyRoleRef,
} from '@/types'

const { list } = defineProps<{
  mainLabel: string
  subLabel: string
  onAdd: () => void
  list:
    | AccountRef[]
    | AgreementRef[]
    | Characteristic[]
    | ContactMedium[]
    | CreditProfile[]
    | PaymentMethodRef[]
    | RelatedPartyOrPartyRoleRef[]
}>()
const onDelete = (index: number) => {
  list.splice(index, 1)
}
</script>
<template>
  <div class="flex flex-col gap-1 rounded-xl shadow-sm border border-gray-200 px-2 py-1 my-1">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <label class="font-medium">{{ mainLabel }}</label>
      <Button @click="onAdd" label="new" icon="pi pi-plus" size="small" outlined />
    </div>

    <!-- Content -->
    <div v-for="(_, index) in list" :key="index" class="rounded-xl shadow-sm border border-gray-200 my-1 p-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-2">
        <label class="text-sm font-medium">{{ subLabel + ' ' + (index + 1) }}</label>
        <Button @click="onDelete(index)" label="delete" icon="pi pi-trash" size="small" severity="danger" />
      </div>

      <!-- Main form -->
      <slot :index="index" />
    </div>
  </div>
</template>

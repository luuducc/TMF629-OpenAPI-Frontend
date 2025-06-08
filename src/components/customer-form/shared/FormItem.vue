<script setup lang="ts">
import { Checkbox, DatePicker, InputNumber, InputText, Select } from 'primevue'

import {
  AccountType,
  AgreementType,
  ContactMediumType,
  PartyRoleSpecificationType,
  PartyType,
  PaymentMethodType,
  RelationshipType,
  StatusType,
  ValueType,
} from '@/types'

const { type = 'text', disabled = false } = defineProps<{
  label: string
  id?: string
  type?: 'text' | 'date' | 'checkbox' | 'number' | 'select'
  disabled?: boolean
  selectOptions?: {
    name: string
    type:
      | StatusType
      | PartyType
      | PartyRoleSpecificationType
      | AccountType
      | AgreementType
      | ValueType
      | RelationshipType
      | ContactMediumType
      | PaymentMethodType
  }[]
}>()
const text = defineModel<string>('text')
const number = defineModel<number>('number')
const date = defineModel<Date>('date')
const check = defineModel<boolean>('check')
const select = defineModel<string>('select')
</script>
<template>
  <div class="flex flex-col flex-1 gap-1">
    <label class="text-sm font-medium" :for="id">{{ label }}</label>
    <InputText v-if="type === 'text'" :id :disabled size="small" v-model="text" />
    <InputNumber v-if="type === 'number'" size="small" v-model="number" />
    <DatePicker v-if="type === 'date'" size="small" v-model="date" />
    <Checkbox v-if="type === 'checkbox'" size="small" v-model="check" binary />
    <!-- prettier-ignore -->
    <Select v-if="type === 'select'" size="small" v-model="select" :options="selectOptions" option-label="name"
      option-value="type">
      <template v-if="$slots.option" #option="slotProps">
        <slot name="option" v-bind="slotProps.option" />
      </template>
      <template v-if="$slots.value" #value="slotProps">
        <slot name="value" v-bind="slotProps.value" />
      </template>
    </Select>
  </div>
</template>

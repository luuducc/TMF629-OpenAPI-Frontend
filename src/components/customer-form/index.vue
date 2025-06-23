<script setup lang="ts">
import { Button } from 'primevue'

import { Form } from '@primevue/forms'

import { type Customer } from '@/types'

import { Description, EngagedParty, GeneralInfo, PartyRoleSpecification, Status, ValidFor } from './basic-info'
import {
  Account,
  Agreement,
  Characteristic,
  ContactMedium,
  CreditProfile,
  PaymentMethod,
  RelatedParty,
} from './list-info'

const emit = defineEmits(['create', 'update'])
const customer = defineModel<Customer>({ required: true })
const { isEdit = false } = defineProps<{ isEdit?: boolean }>()
// emit to Create view
const onsubmit = () => {
  if (isEdit) {
    emit('update')
    return
  } else {
    emit('create')
  }
}
</script>
<template>
  <Form @submit="onsubmit" class="w-7/12 border rounded-xl border-gray-200 shadow-sm m-2 px-5 py-2 min-w-[30rem]">
    <!-- Basic info -->
    <GeneralInfo :is-edit="isEdit" v-model:name="customer.name" v-model:id="customer.id" />
    <Status v-if="isEdit" v-model:status="customer.status" v-model:status-reason="customer.statusReason" />
    <Description v-model:description="customer.description" />
    <ValidFor :valid-for="customer.validFor" />
    <EngagedParty :engaged-party="customer.engagedParty" v-model:role="customer.role" />
    <PartyRoleSpecification :party-role-specification="customer.partyRoleSpecification" />

    <!-- List info -->
    <Account :list="customer.account" />
    <Agreement :list="customer.agreement" />
    <Characteristic :list="customer.characteristic" />
    <ContactMedium :list="customer.contactMedium" />
    <CreditProfile :list="customer.creditProfile" />
    <PaymentMethod :list="customer.paymentMethod" />
    <RelatedParty :list="customer.relatedParty" />

    <div class="flex justify-end">
      <Button type="submit" label="Submit" size="small" icon="pi pi-check" severity="primary" />
    </div>
  </Form>
</template>

<script setup lang="ts">
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

defineProps<{ customer: Customer }>()
</script>
<template>
  <div class="flex border rounded-xl border-gray-200 shadow-sm m-2">
    <!-- Basic info -->
    <div class="w-1/2 p-5 border-r border-gray-200">
      <GeneralInfo :name="customer.name" :id="customer.id" />
      <Status :status="customer.status" :status-reason="customer.statusReason" />
      <Description :description="customer.description" />
      <ValidFor :valid-for="customer.validFor" />
      <EngagedParty :engaged-party="customer.engagedParty" :role="customer.role" />
      <PartyRoleSpecification :party-role-specification="customer.partyRoleSpecification" />
    </div>
    <!-- List info -->
    <div class="w-1/2 p-5">
      <Account :account="customer.account" />
      <Agreement :agreement="customer.agreement" />
      <Characteristic :characteristic="customer.characteristic" />
      <ContactMedium :contact-medium="customer.contactMedium" />
      <CreditProfile :profile="customer.creditProfile" />
      <PaymentMethod :method="customer.paymentMethod" />
      <RelatedParty :party="customer.relatedParty" />
    </div>
  </div>
</template>

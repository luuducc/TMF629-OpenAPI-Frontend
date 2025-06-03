<script setup lang="ts">
import type {
  AccountRef,
  AgreementRef,
  Characteristic,
  ContactMedium,
  CreditProfile,
  PaymentMethodRef,
  RelatedPartyOrPartyRoleRef,
} from '@/types'

import AccountForm from '../forms/AccountForm.vue'
import AgreementForm from '../forms/AgreementForm.vue'
import CharacteristicForm from '../forms/CharacteristicForm.vue'
import ContactMediumForm from '../forms/ContactMediumForm.vue'
import CreditProfileForm from '../forms/CreditProfileForm.vue'
import PaymentMethodForm from '../forms/PaymentMethodForm.vue'
import RelatedPartyOrPartyRoleForm from '../forms/RelatedPartyOrPartyRoleForm.vue'
import FormGenerator from '../shared/FormGenerator.vue'

type AvailableItem =
  | AccountRef
  | AgreementRef
  | Characteristic
  | ContactMedium
  | CreditProfile
  | PaymentMethodRef
  | RelatedPartyOrPartyRoleRef

// Array lists
const account = defineModel<AccountRef[]>('account', { required: true })
const agreement = defineModel<AgreementRef[]>('agreement', { required: true })
const characteristic = defineModel<Characteristic[]>('characteristic', {
  required: true,
})
const contactMedium = defineModel<ContactMedium[]>('contactMedium', {
  required: true,
})
const creditProfile = defineModel<CreditProfile[]>('creditProfile', {
  required: true,
})
const paymentMethod = defineModel<PaymentMethodRef[]>('paymentMethod', {
  required: true,
})
const relatedParty = defineModel<RelatedPartyOrPartyRoleRef[]>('relatedParty', {
  required: true,
})

defineProps<{ readonly: boolean }>()

// default initial value to render a list item
const itemTemplates = {
  account: {
    name: '',
    '@referredType': undefined,
  },
  agreement: {
    name: '',
    '@referredType': undefined,
  },
  characteristic: {
    characteristicRelationship: {
      relationshipType: undefined,
    },
    name: '',
    valueType: undefined,
  },
  contactMedium: {
    '@type': undefined,
    contactType: '',
  },
  creditProfile: {
    creditProfileDate: new Date(),
    creditRiskRating: 0,
    creditScore: 0,
    validFor: {
      startDateTime: new Date(),
      endDateTime: new Date(),
    },
  },
  paymentMethod: {
    name: '',
    '@referredType': undefined,
  },
  relatedParty: {
    partyOrPartyRole: {
      name: '',
      '@referredType': undefined,
    },
    role: '',
  },
}
const addItem = (list: AvailableItem[], key: keyof typeof itemTemplates) => {
  list.push(structuredClone(itemTemplates[key]))
}
</script>
<template>
  <!-- Account Form -->
  <FormGenerator
    main-label="Account"
    :list="account"
    :readonly
    :on-add="() => addItem(account, 'account')"
    :form-component="AccountForm"
  />
  <!-- Agreement Form -->
  <FormGenerator
    main-label="Agreement"
    :list="agreement"
    :readonly
    :on-add="() => addItem(agreement, 'agreement')"
    :form-component="AgreementForm"
  />
  <!-- Characteristic Form -->
  <FormGenerator
    main-label="Characteristic"
    :list="characteristic"
    :readonly
    :on-add="() => addItem(characteristic, 'characteristic')"
    :form-component="CharacteristicForm"
  />
  <!-- Contact Medium Form -->
  <FormGenerator
    main-label="Contact Medium"
    :list="contactMedium"
    :readonly
    :on-add="() => addItem(contactMedium, 'contactMedium')"
    :form-component="ContactMediumForm"
  />
  <!-- Credit Profile Form -->
  <FormGenerator
    main-label="Credit Profile"
    :list="creditProfile"
    :readonly
    :on-add="() => addItem(creditProfile, 'creditProfile')"
    :form-component="CreditProfileForm"
  />
  <!-- Payment Method Form -->
  <FormGenerator
    main-label="Payment Method"
    :list="paymentMethod"
    :readonly
    :on-add="() => addItem(paymentMethod, 'paymentMethod')"
    :form-component="PaymentMethodForm"
  />
  <!-- Related Party Or Party Role Form -->
  <FormGenerator
    main-label="Related Party"
    :list="relatedParty"
    :readonly
    :on-add="() => addItem(relatedParty, 'relatedParty')"
    :form-component="RelatedPartyOrPartyRoleForm"
  />
</template>

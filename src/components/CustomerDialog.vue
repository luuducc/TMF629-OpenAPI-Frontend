<script setup lang="ts">
import { reactive, watch, toRaw, watchEffect } from 'vue';
import {
  ContactMediumType, PartyType, AccountType, AgreementType, ValueType, RelationshipType, PaymentMethodType
} from "@/types"
import type {
  Customer, ContactMedium, AccountRef, AgreementRef, Characteristic, CreditProfile, PaymentMethodRef, RelatedPartyOrPartyRoleRef
} from "@/types"
import { Dialog, Button, InputText, Textarea } from 'primevue';
import { Form } from '@primevue/forms';
import {
  ContactMediumForm,
  EngagedPartyForm,
  AccountForm,
  AgreementForm,
  CharacteristicForm,
  CreditProfileForm,
  PartyRoleSpecificationForm,
  PaymentMethodForm,
  RelatedPartyOrPartyRoleForm,
  FormListGenerator
} from '@/components/form';

// states
const visible = defineModel<boolean>('visible');
const accounts = reactive<AccountRef[]>([])
const agreements = reactive<AgreementRef[]>([])
const characteristics = reactive<Characteristic[]>([])
const contactMediums = reactive<ContactMedium[]>([])
const creditProfiles = reactive<CreditProfile[]>([])
const paymentMethods = reactive<PaymentMethodRef[]>([])
const relatedParties = reactive<RelatedPartyOrPartyRoleRef[]>([])

const customer = reactive<Customer>({
  name: '',
  description: '',
  role: '',
  engagedParty: {
    name: '',
    referredType: PartyType.BaseType,
  },
  contactMedium: [],
  account: [],
  agreement: [],
  characteristic: [],
  creditProfile: [],
  paymentMethod: [],
  relatedParty: []
})

// HANDLERS
watch(customer, newVal => {
  console.log(toRaw(newVal))
})


const addAccount = (): void => {
  accounts.push({
    name: '', referredType: AccountType.BaseType
  })
}
const addAgreement = (): void => {
  agreements.push({
    name: '', referredType: AgreementType.BaseType
  })
}
const addCharacteristic = (): void => {
  characteristics.push({
    characteristicRelationship: {
      relationshipType: RelationshipType.basetype
    },
    name: '', 
    valueType: ValueType.basetype
  })
}
const addContactMedium = (): void => {
  contactMediums.push({
    type: ContactMediumType.BaseType, contactType: ''
  })
}
const addCreditProfile = (): void => {
  creditProfiles.push({
    creditProfileDate: new Date(),
    creditRiskRating: 0,
    creditScore: 0,
    validFor: {
      startDateTime: new Date(),
      endDateTime: new Date()
    }
  })
}
const addPaymentMethod = (): void => {
  paymentMethods.push({
    name: '', referredType: PaymentMethodType.BaseType
  })
}
const addRelatedParty = (): void => {
  relatedParties.push({
    partyOrPartyRole: {
      name: '',
      referredType: PartyType.BaseType
    },
    role: ''
  })
}
watchEffect(() => {
  customer.account = accounts
  customer.agreement = agreements
  customer.characteristic = characteristics
  customer.contactMedium = contactMediums
  customer.creditProfile = creditProfiles
  customer.paymentMethod = paymentMethods
  customer.relatedParty = relatedParties
})
</script>
<template>
  <Dialog v-model:visible="visible" header="Create new customer">
    <Form class="flex flex-col gap-y-6 w-[35rem]">

      <!-- Customer Name -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="customerName">Name</label>
        <InputText 
          v-model="customer.name"
          size="small"
          placeholder="Customer name"
          id="customerName"
        />
      </div>

      <!-- Engaged Party -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Engaged Party</label>
        <EngagedPartyForm 
          v-model:party-name="customer.engagedParty.name" 
          v-model:party-type="customer.engagedParty.referredType"/>
      </div>

      <!-- Role -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="role">Role</label>
        <InputText 
          v-model="customer.role" 
          size="small" 
          placeholder="Role played by Engaged party" 
          id="role" 
        />
      </div>

      <!-- Description -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="description">Description</label>
        <Textarea 
          v-model="customer.description"
          placeholder="Write something about customer..."
          size="small" 
          id="description" 
        />
      </div>

      <!-- Party Role Specification -->
      <div class="flex flex-col gap-2">
        <label class="font-medium" for="partyRoleSpecification">Party role specification</label>
        <PartyRoleSpecificationForm/>
      </div>

      <!-- Account -->
      <FormListGenerator
        main-label="Account"
        :list="accounts"
        :on-add="addAccount"
        :form-component="AccountForm"
      />

      <!-- Agreement -->
      <FormListGenerator
        main-label="Agreement"
        :list="agreements"
        :on-add="addAgreement"
        :form-component="AccountForm"
      />

      <!-- Characteristic -->
      <FormListGenerator
        main-label="Characteristic"
        :list="characteristics"
        :on-add="addCharacteristic"
        :form-component="CharacteristicForm"
      />

      <!-- Contact Medium -->
      <FormListGenerator
        main-label="Contact medium"
        sub-label="Medium"
        :list="contactMediums"
        :on-add="addContactMedium"
        :form-component="ContactMediumForm"
      />

      <!-- Credit Profile -->
      <FormListGenerator
        main-label="Credit profile"
        sub-label="Profile"
        :list="creditProfiles"
        :on-add="addCreditProfile"
        :form-component="CreditProfileForm"
      />

      <!-- Payment Method -->
      <FormListGenerator
        main-label="Payment method"
        sub-label="Method"
        :list="paymentMethods"
        :on-add="addPaymentMethod"
        :form-component="PaymentMethodForm"
      />

      <!-- Related Party Or Party Role -->
      <FormListGenerator
        main-label="Related party"
        sub-label="Party"
        :list="relatedParties"
        :on-add="addRelatedParty"
        :form-component="RelatedPartyOrPartyRoleForm"
      />

    </Form>
    
    <template #footer>
      <div class="flex justify-end gap-3">
        <Button 
          type="submit" 
          icon="pi pi-check" 
          size="small" 
          label="Submit" 
          severity="primary" 
        />
        <Button 
          label="Close" 
          icon="pi pi-times" 
          size="small" 
          severity="secondary" 
          @click="visible = false" 
          outlined
        />
      </div>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { computed, reactive, toRaw, watch, watchEffect } from 'vue';
import {
  AccountType,
  AgreementType,
  ContactMediumType,
  CustomerFormMode,
  PartyType,
  PaymentMethodType,
  RelationshipType,
  StatusType,
  statusMap,
  ValueType
} from '@/types';
import type {
  AccountRef,
  AgreementRef,
  Characteristic,
  ContactMedium,
  CreditProfile,
  Customer,
  PaymentMethodRef,
  RelatedPartyOrPartyRoleRef
} from '@/types';
import { Button, DatePicker, Dialog, InputText, Textarea, Select } from 'primevue';
import { Form } from '@primevue/forms';
import {
  AccountForm,
  AgreementForm,
  CharacteristicForm,
  ContactMediumForm,
  CreditProfileForm,
  EngagedPartyForm,
  FormListGenerator,
  PartyRoleSpecificationForm,
  PaymentMethodForm,
  RelatedPartyOrPartyRoleForm
} from '@/components/form';

// props
const props = defineProps<{ mode: CustomerFormMode }>()

const disabled = computed(() => props.mode === CustomerFormMode.View)

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
  // Basic info
  id: '',
  name: '',
  role: '',
  description: '',
  status: undefined,
  statusReason: '',

  // Validity period
  validFor: {
    startDateTime: new Date(),
    endDateTime: new Date()
  },

  // Engaged party
  engagedParty: {
    name: '',
    referredType: PartyType.BaseType
  },
  partyRoleSpecification: {
    name: '',
    referredType: undefined
  },

  // Associated entities
  account: [],
  agreement: [],
  characteristic: [],
  contactMedium: [],
  creditProfile: [],
  paymentMethod: [],
  relatedParty: []
})

// variables
const statusOptions: { name: string, type: StatusType }[] = 
  Object.entries(statusMap).map(([key, value]) => ({
    name: value,
    type: Number(key) as StatusType
  }))
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

      <!-- Customer Name and Id -->
      <div class="flex gap-4">
        <div class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerName">Name</label>
          <InputText 
            v-model="customer.name"
            :disabled
            size="small"
            placeholder="Customer name"
            id="customerName"
          />
        </div>
        <div v-if="mode !== CustomerFormMode.Create" class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerId">Id</label>
          <InputText 
            v-model="customer.id"
            :disabled
            size="small"
            placeholder="Customer Id"
            id="customerId"
          />
        </div>
      </div>

      <!-- Status and Status Reason -->
      <div v-if="mode !== CustomerFormMode.Create" class="flex gap-4">
        <div class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerStatus">Status</label>
          <Select 
            v-model="customer.status"
            :disabled
            :options="statusOptions"
            option-label="name"
            option-value="type"
            size="small"
            placeholder="Customer status"
            id="customerStatus"
          />
        </div>
        <div class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerStatusReason">Status reason</label>
          <InputText 
            v-model="customer.statusReason"
            :disabled
            size="small"
            placeholder="Reason for status"
            id="customerStatusReason"
          />
        </div>
      </div>

      <!-- Valid For -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Valid for</label>
        <div class="flex gap-4">
          <div class="flex flex-col flex-1 gap-1">
            <label class="text-sm font-medium" for="startDate">Start date</label>
            <DatePicker 
              v-model="customer.validFor.startDateTime"
              :disabled
              size="small"
              id="startDate"
            />
          </div>
          <div class="flex flex-col flex-1 gap-1">
            <label class="text-sm font-medium" for="endDate">End date</label>
            <DatePicker 
              v-model="customer.validFor.endDateTime"
              :disabled
              size="small"
              id="endDate"
            />
          </div>
        </div>
      </div>

      <!-- Engaged Party -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Engaged Party</label>
        <EngagedPartyForm
          :disabled
          v-model:party-name="customer.engagedParty.name" 
          v-model:party-type="customer.engagedParty.referredType"/>
      </div>

      <!-- Role -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="role">Role</label>
        <InputText 
          v-model="customer.role" 
          :disabled
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
          :disabled
          placeholder="Write something about customer..."
          size="small" 
          id="description" 
        />
      </div>

      <!-- Party Role Specification -->
      <div class="flex flex-col gap-2">
        <label class="font-medium" for="partyRoleSpecification">Party role specification</label>
        <PartyRoleSpecificationForm v-model="customer.partyRoleSpecification" :disabled/>
      </div>

      <!-- Account -->
      <FormListGenerator
        main-label="Account"
        :list="accounts"
        :disabled
        :on-add="addAccount"
        :form-component="AccountForm"
      />

      <!-- Agreement -->
      <FormListGenerator
        main-label="Agreement"
        :list="agreements"
        :disabled
        :on-add="addAgreement"
        :form-component="AgreementForm"
      />

      <!-- Characteristic -->
      <FormListGenerator
        main-label="Characteristic"
        :list="characteristics"
        :disabled
        :on-add="addCharacteristic"
        :form-component="CharacteristicForm"
      />

      <!-- Contact Medium -->
      <FormListGenerator
        main-label="Contact medium"
        sub-label="Medium"
        :list="contactMediums"
        :disabled
        :on-add="addContactMedium"
        :form-component="ContactMediumForm"
      />

      <!-- Credit Profile -->
      <FormListGenerator
        main-label="Credit profile"
        sub-label="Profile"
        :list="creditProfiles"
        :disabled
        :on-add="addCreditProfile"
        :form-component="CreditProfileForm"
      />

      <!-- Payment Method -->
      <FormListGenerator
        main-label="Payment method"
        sub-label="Method"
        :list="paymentMethods"
        :disabled
        :on-add="addPaymentMethod"
        :form-component="PaymentMethodForm"
      />

      <!-- Related Party Or Party Role -->
      <FormListGenerator
        main-label="Related party"
        sub-label="Party"
        :list="relatedParties"
        :disabled
        :on-add="addRelatedParty"
        :form-component="RelatedPartyOrPartyRoleForm"
      />

    </Form>
    <template #footer>
      <div class="flex justify-end gap-3">
        <Button 
          v-if="!disabled"
          type="submit" 
          icon="pi pi-check" 
          size="small" 
          label="Save" 
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
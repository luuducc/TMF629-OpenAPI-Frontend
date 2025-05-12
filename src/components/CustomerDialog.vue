<script setup lang="ts">
import { reactive, watch, toRaw, watchEffect, ref } from 'vue';
import {
  ContactMediumType, PartyType, AccountType, AgreementType, ValueType, RelationshipType, PaymentMethodType
} from "@/types"
import type {
  Customer, ContactMedium, AccountRef, AgreementRef, Characteristic, CreditProfile, PaymentMethodRef, RelatedPartyOrPartyRoleRef
} from "@/types"
import { Dialog, Button, InputText, Textarea, Divider } from 'primevue';
import { Form } from '@primevue/forms';
import ContactMediumForm from './form/ContactMediumForm.vue';
import EngagedPartyForm from './form/EngagedPartyForm.vue';
import AccountForm from './form/AccountForm.vue';
import AgreementForm from './form/AgreementForm.vue';
import CharacteristicForm from './form/CharacteristicForm.vue';
import CreditProfileForm from './form/CreditProfileForm.vue';
import PartyRoleSpecificationForm from './form/PartyRoleSpecificationForm.vue';
import PaymentMethodForm from './form/PaymentMethodForm.vue';
import RelatedPartyOrPartyRoleForm from './form/RelatedPartyOrPartyRoleForm.vue';

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
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-medium">Account</label>
          <Button 
            @click="addAccount" 
            label="New" 
            icon="pi pi-plus"
            size="small"
            outlined
          />
        </div>

        <div 
          v-for="(_, index) in accounts" 
          :key="index" 
          class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Account {{ index + 1 }}</label>
            <Button 
              @click="accounts.splice(index, 1)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" 
            />
          </div>
          <AccountForm v-model="accounts[index]"/>
        </div>
      </div>

      <!-- Agreement -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-medium">Agreement</label>
          <Button 
            @click="addAgreement" 
            label="New" 
            icon="pi pi-plus"
            size="small"
            outlined
          />
        </div>

        <div 
          v-for="(_, index) in agreements" 
          :key="index" 
          class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Agreement {{ index + 1 }}</label>
            <Button 
              @click="agreements.splice(index, 1)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" />
          </div>
          <AgreementForm v-model="agreements[index]"/>
        </div>
      </div>

      <!-- Characteristic -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-medium">Characteristic</label>
          <Button 
            @click="addCharacteristic" 
            label="New" 
            icon="pi pi-plus"
            size="small"
            outlined
          />
        </div>

        <div 
          v-for="(_, index) in characteristics" 
          :key="index" 
          class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Characteristic {{ index + 1 }}</label>
            <Button 
              @click="characteristics.splice(index, 1)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" 
            />
          </div>
          <CharacteristicForm v-model="characteristics[index]"/>
        </div>
      </div>

      <!-- Contact Medium -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-medium">Contact Medium</label>
          <Button 
            @click="addContactMedium" 
            label="New" 
            icon="pi pi-plus"
            size="small"
            outlined
          />
        </div>

        <div 
          v-for="(_, index) in contactMediums" 
          :key="index" 
          class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Medium {{ index + 1 }}</label>
            <Button 
              @click="contactMediums.splice(index, 1)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" 
            />
          </div>
          <ContactMediumForm v-model="contactMediums[index]" />
        </div>
      </div>

      <!-- Credit Profile -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-medium">Credit Profile</label>
          <Button 
            @click="addCreditProfile" 
            label="New" 
            icon="pi pi-plus"
            size="small"
            outlined
          />
        </div>

        <div 
          v-for="(_, index) in creditProfiles" 
          :key="index" 
          class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Profile {{ index + 1 }}</label>
            <Button 
              @click="creditProfiles.splice(index, 1)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" 
            />
          </div>
          <CreditProfileForm v-model="creditProfiles[index]"/>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-medium">Payment method</label>
          <Button 
            @click="addPaymentMethod" 
            label="New" 
            icon="pi pi-plus"
            size="small"
            outlined
          />
        </div>

        <div 
          v-for="(_, index) in paymentMethods" 
          :key="index" 
          class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Method {{ index + 1 }}</label>
            <Button 
              @click="paymentMethods.splice(index, 1)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" 
            />
          </div>
          <PaymentMethodForm v-model="paymentMethods[index]"/>
        </div>
      </div>

      <!-- Related Party Or Party Role -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label class="font-medium">Related party</label>
          <Button 
            @click="addRelatedParty" 
            label="New" 
            icon="pi pi-plus"
            size="small"
            outlined
          />
        </div>

        <div 
          v-for="(_, index) in relatedParties" 
          :key="index" 
          class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium">Party {{ index + 1 }}</label>
            <Button 
              @click="relatedParties.splice(index, 1)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" 
            />
          </div>
          <RelatedPartyOrPartyRoleForm v-model="relatedParties[index]"/>
        </div>
      </div>

    </Form>
    <template #footer>
      <!-- Buttons -->
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
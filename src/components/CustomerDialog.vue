<script setup lang="ts">
import { reactive, watch, toRaw, watchEffect, ref } from 'vue';
import { ContactMediumType } from '@/types/contact-medium';
import { PartyType } from '@/types/party-type';
import { AccountType } from '@/types/account-ref';
import type { Customer } from '@/types/customer';
import type { ContactMedium } from '@/types/contact-medium';
import { Dialog, Button, InputText, Textarea, Select  } from 'primevue';
import { Form } from '@primevue/forms';
import ContactMediumForm from '@/components/form/ContactMediumForm.vue';
import EngagedPartyForm from './form/EngagedPartyForm.vue';
import AccountForm from './form/AccountForm.vue';

// states
const visible = defineModel<boolean>('visible');
const contactMediums = reactive<ContactMedium[]>([])
const customer = reactive<Customer>({
  name: '',
  description: '',
  role: '',
  engagedParty: {
    name: '',
    referredType: PartyType.BaseType,
  },
  contactMedium: [],
  account: {
    name: '',
    referredType: AccountType.BaseType
  }
})

// HANDLERS
watch(customer, newVal => {
  console.log(toRaw(newVal))
})

const addContactMedium = (): void => {
  contactMediums.push({
    type: ContactMediumType.BaseType, contactType: ''
  })
}
const deleteContactMedium = (index: number): void => {
  contactMediums.splice(index, 1)
}

watchEffect(() => {
  customer.contactMedium = contactMediums
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

      <!-- Account -->
      <div class="flex flex-col gap-2">
        <label class="font-medium" for="account">Account</label>
        <AccountForm 
          v-model:account-name="customer.account.name"
          v-model:account-type="customer.account.referredType"
          id="account"
        />
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
              @click="deleteContactMedium(index)" 
              label="Delete" 
              icon="pi pi-trash"
              severity="danger" 
              size="small" />
          </div>
          <ContactMediumForm :index="index" v-model="contactMediums[index]" />
        </div>
      </div>

      <!-- Description -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="description">Description</label>
        <Textarea 
          v-model="customer.description"
          size="small" 
          id="description" 
        />
      </div>

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
    </Form>
  </Dialog>
</template>
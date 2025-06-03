<script setup lang="ts">
import type { ContactMedium, EmailContactMedium, FaxContactMedium, GeographicAddressContactMedium, PhoneContactMedium, SocialContactMedium } from '@/types/contact-medium';
import { ContactMediumType } from '@/types/contact-medium';
import { InputText, Select, type SelectChangeEvent } from 'primevue';
import { ref, computed } from 'vue';

const contactMedium = defineModel<ContactMedium>({ required: true })
defineProps<{ readonly: boolean }>()
const currentOption = computed({
  get: () => contactMedium.value['@type'],
  set: val => { contactMedium.value['@type'] = val }
})

const options = [
  { name: 'Email', type: ContactMediumType.EmailContactMedium },
  { name: 'Fax', type: ContactMediumType.FaxContactMedium },
  { name: 'Geographic Address', type: ContactMediumType.GeographicAddressContactMedium },
  { name: 'Phone', type: ContactMediumType.PhoneContactMedium },
  { name: 'Social', type: ContactMediumType.SocialContactMedium }
];

const onTypeChange = (e: SelectChangeEvent) => contactMedium.value = getInitialContactMedium(e.value)
const getInitialContactMedium = (type: ContactMediumType): ContactMedium => {
  switch (type) {
    case ContactMediumType.EmailContactMedium:
      return { '@type': type, contactType: '', emailAddress: '' };
    case ContactMediumType.FaxContactMedium:
      return { '@type': type, contactType: '', faxNumber: '' };
    case ContactMediumType.GeographicAddressContactMedium:
      return {
        '@type': type, contactType: '',
        city: '', country: '', postCode: '',
        stateOrProvince: '', street1: '', street2: ''
      };
    case ContactMediumType.PhoneContactMedium:
      return { '@type': type, contactType: '', phoneNumber: '' };
    case ContactMediumType.SocialContactMedium:
      return { '@type': type, contactType: '', socialNetworkId: '' };
    default:
      return { '@type': type, contactType: '' };
  }
}
</script>
<template>
  <div class="flex flex-col justify-between">
    <!-- Contact Medium Type Select -->
    <Select 
      v-if="!readonly"
      v-model="currentOption"
      :options
      option-label="name" 
      option-value="type" 
      @change="onTypeChange"
      class="mb-4"
      size="small"
      placeholder="Select a contact medium"
    />
    <p v-else class="text-sm mb-4">{{ currentOption }}</p>
    
      <!-- Email -->
    <div v-if="currentOption==ContactMediumType.EmailContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Email address</label>
      <InputText 
        v-if="!readonly"
        v-model="(contactMedium as EmailContactMedium).emailAddress"  
        type="text" 
        size="small" 
        placeholder="e.g., user@example.com"
      />
      <p v-else class="text-sm">{{ (contactMedium as EmailContactMedium).emailAddress }}</p>
    </div>
  
      <!-- Fax -->
    <div v-if="currentOption==ContactMediumType.FaxContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Fax number</label>
      <InputText 
        v-if="!readonly"
        v-model="(contactMedium as FaxContactMedium).faxNumber" 
        type="text" 
        size="small" 
        placeholder="e.g., +84 123 4567"
      />
      <p v-else class="text-sm">{{ (contactMedium as FaxContactMedium).faxNumber }}</p>
    </div>
  
      <!-- Geographic Address -->
    <div 
      class="grid grid-cols-2 gap-x-4 gap-y-3"
      v-if="currentOption==ContactMediumType.GeographicAddressContactMedium">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">City</label>
        <InputText 
          v-if="!readonly"
          v-model="(contactMedium as GeographicAddressContactMedium).city" 
          type="text" 
          size="small" 
        />
        <p v-else class="text-sm">{{ (contactMedium as GeographicAddressContactMedium).city }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Country</label>
        <InputText 
          v-if="!readonly"
          v-model="(contactMedium as GeographicAddressContactMedium).country" 
          type="text" 
          size="small" 
        />
        <p v-else class="text-sm">{{ (contactMedium as GeographicAddressContactMedium).country }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Postcode</label>
        <InputText 
          v-if="!readonly"
          v-model="(contactMedium as GeographicAddressContactMedium).postCode" 
          type="text"
          size="small" 
        />
        <p v-else class="text-sm">{{ (contactMedium as GeographicAddressContactMedium).postCode }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">State or province</label>
        <InputText 
          v-if="!readonly"
          v-model="(contactMedium as GeographicAddressContactMedium).stateOrProvince" 
          size="small" 
          type="text" 
        />
        <p v-else class="text-sm">{{ (contactMedium as GeographicAddressContactMedium).stateOrProvince }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Street 1</label>
        <InputText 
          v-if="!readonly"
          v-model="(contactMedium as GeographicAddressContactMedium).street1" 
          type="text" 
          size="small" 
        />
        <p v-else class="text-sm">{{ (contactMedium as GeographicAddressContactMedium).street1 }}</p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Street 2</label>
        <InputText 
          v-if="!readonly"
          v-model="(contactMedium as GeographicAddressContactMedium).street2" 
          size="small" 
          type="text" 
        />
        <p v-else class="text-sm">{{ (contactMedium as GeographicAddressContactMedium).street2 }}</p>
      </div>
    </div>
  
      <!-- Phone -->
    <div v-if="currentOption==ContactMediumType.PhoneContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Phone number</label>
      <InputText 
        v-if="!readonly"
        v-model="(contactMedium as PhoneContactMedium).phoneNumber" 
        type="text" 
        size="small" 
        placeholder="e.g., +84 901 234 567"
      />
      <p v-else class="text-sm">{{ (contactMedium as PhoneContactMedium).phoneNumber }}</p>
    </div>
    
      <!-- SocialContactMedium -->
    <div v-if="currentOption==ContactMediumType.SocialContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Social network id</label>
      <InputText 
        v-if="!readonly"
        v-model="(contactMedium as SocialContactMedium).socialNetworkId" 
        type="text" 
        size="small" 
        placeholder="e.g., username_1234"
      />
      <p v-else class="text-sm">{{ (contactMedium as SocialContactMedium).socialNetworkId }}</p>
    </div>  
  </div>
</template>
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
      v-model="currentOption"
      :readonly
      :options
      option-label="name" 
      option-value="type" 
      @change="onTypeChange"
      class="mb-4"
      size="small"
      placeholder="Select a contact medium"
    />
    
      <!-- Email -->
    <div v-if="currentOption==ContactMediumType.EmailContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Email address</label>
      <InputText 
        v-model="(contactMedium as EmailContactMedium).emailAddress"  
        :readonly
        type="text" 
        size="small" 
        placeholder="e.g., user@example.com"
      />
    </div>
  
      <!-- Fax -->
    <div v-if="currentOption==ContactMediumType.FaxContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Fax number</label>
      <InputText 
        v-model="(contactMedium as FaxContactMedium).faxNumber" 
        :readonly
        type="text" 
        size="small" 
        placeholder="e.g., +84 123 4567"
      />
    </div>
  
      <!-- Geographic Address -->
    <div 
      class="grid grid-cols-2 gap-x-4 gap-y-3"
      v-if="currentOption==ContactMediumType.GeographicAddressContactMedium">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">City</label>
        <InputText 
          v-model="(contactMedium as GeographicAddressContactMedium).city" 
          :readonly
          type="text" 
          size="small" 
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Country</label>
        <InputText 
          v-model="(contactMedium as GeographicAddressContactMedium).country" 
          :readonly
          type="text" 
          size="small" 
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Postcode</label>
        <InputText 
          v-model="(contactMedium as GeographicAddressContactMedium).postCode" 
          :readonly
          type="text"
          size="small" 
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">State or province</label>
        <InputText 
          v-model="(contactMedium as GeographicAddressContactMedium).stateOrProvince" 
          :readonly
          size="small" 
          type="text" 
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Street 1</label>
        <InputText 
          v-model="(contactMedium as GeographicAddressContactMedium).street1" 
          :readonly
          type="text" 
          size="small" 
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Street 2</label>
        <InputText 
          v-model="(contactMedium as GeographicAddressContactMedium).street2" 
          :readonly
          size="small" 
          type="text" 
        />
      </div>
    </div>
  
      <!-- Phone -->
    <div v-if="currentOption==ContactMediumType.PhoneContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Phone number</label>
      <InputText 
        v-model="(contactMedium as PhoneContactMedium).phoneNumber" 
        :readonly
        type="text" 
        size="small" 
        placeholder="e.g., +84 901 234 567"
      />
    </div>
    
      <!-- SocialContactMedium -->
    <div v-if="currentOption==ContactMediumType.SocialContactMedium" class="flex flex-col gap-2">
      <label class="text-sm font-medium">Social network id</label>
      <InputText 
        v-model="(contactMedium as SocialContactMedium).socialNetworkId" 
        :readonly
        type="text" 
        size="small" 
        placeholder="e.g., @username"
      />
    </div>  
  </div>
</template>
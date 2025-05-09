<script setup lang="ts">
import type { ContactMedium, EmailContactMedium, FaxContactMedium, GeographicAddressContactMedium, PhoneContactMedium, SocialContactMedium } from '@/types/contact-medium';
import { ContactMediumType } from '@/types/contact-medium';
import { InputText, Select, type SelectChangeEvent } from 'primevue';
import { ref } from 'vue';

const contactMedium = defineModel<ContactMedium>()
const currentOption = ref<number>()

const options = [
  { name: 'Email Contact Medium', type: ContactMediumType.EmailContactMedium },
  { name: 'Fax Contact Medium', type: ContactMediumType.FaxContactMedium },
  { name: 'Geographic Address Contact Medium', type: ContactMediumType.GeographicAddressContactMedium },
  { name: 'Phone Contact Medium', type: ContactMediumType.PhoneContactMedium },
  { name: 'Social Contact Medium', type: ContactMediumType.SocialContactMedium }
];

const onTypeChange = (e: SelectChangeEvent) => contactMedium.value = getInitialContactMedium(e.value)
const getInitialContactMedium = (type: ContactMediumType): ContactMedium => {
  switch (type) {
    case ContactMediumType.EmailContactMedium:
      return { type, contactType: '', emailAddress: '' };
    case ContactMediumType.FaxContactMedium:
      return { type, contactType: '', faxNumber: '' };
    case ContactMediumType.GeographicAddressContactMedium:
      return {
        type, contactType: '',
        city: '', country: '', postCode: '',
        stateOrProvince: '', street1: '', street2: ''
      };
    case ContactMediumType.PhoneContactMedium:
      return { type, contactType: '', phoneNumber: '' };
    case ContactMediumType.SocialContactMedium:
      return { type, contactType: '', socialNetworkId: '' };
    default:
      return { type, contactType: '' };
  }
}
</script>
<template>
  <div class="flex flex-col justify-between">
    <Select 
      v-model="currentOption"
      :options
      option-label="name" 
      option-value="type" 
      @change="onTypeChange"
      class="mb-2"
      placeholder="Select a contact medium"/>
    
      <!-- EmailContactMedium -->
    <div v-if="currentOption==ContactMediumType.EmailContactMedium">
      <InputText v-model="(contactMedium as EmailContactMedium).emailAddress"  type="text" placeholder="Email address"/>
    </div>
  
      <!-- FaxContactMedium -->
    <div v-if="currentOption==ContactMediumType.FaxContactMedium">
      <InputText v-model="(contactMedium as FaxContactMedium).faxNumber" type="text" placeholder="Fax number"/>
    </div>
  
      <!-- GeographicAddressContactMedium -->
    <div 
      class="grid grid-cols-2 gap-x-2 gap-y-3"
      v-if="currentOption==ContactMediumType.GeographicAddressContactMedium">
      <InputText v-model="(contactMedium as GeographicAddressContactMedium).city" type="text" placeholder="City"/>
      <InputText v-model="(contactMedium as GeographicAddressContactMedium).country" type="text" placeholder="Country"/>
      <InputText v-model="(contactMedium as GeographicAddressContactMedium).postCode" type="text" placeholder="Postcode"/>
      <InputText v-model="(contactMedium as GeographicAddressContactMedium).stateOrProvince" type="text" placeholder="State or province"/>
      <InputText v-model="(contactMedium as GeographicAddressContactMedium).street1" type="text" placeholder="Street 1"/>
      <InputText v-model="(contactMedium as GeographicAddressContactMedium).street2" type="text" placeholder="Street 2"/>
    </div>
  
      <!-- PhoneContactMedium -->
    <div v-if="currentOption==ContactMediumType.PhoneContactMedium">
      <InputText v-model="(contactMedium as PhoneContactMedium).phoneNumber" type="text" placeholder="Phone number"/>
    </div>
    
      <!-- SocialContactMedium -->
    <div v-if="currentOption==ContactMediumType.SocialContactMedium">
      <InputText v-model="(contactMedium as SocialContactMedium).socialNetworkId" type="text" placeholder="Social network id"/>
    </div>  
  </div>
</template>
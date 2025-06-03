<script setup lang="ts">
import { InputText, Select, type SelectChangeEvent } from 'primevue'

import { computed } from 'vue'

import {
  ContactMediumType,
  contactOptions,
  type ContactMedium,
  type EmailContactMedium,
  type FaxContactMedium,
  type GeographicAddressContactMedium,
  type PhoneContactMedium,
  type SocialContactMedium,
} from '@/types'

defineProps<{ readonly: boolean }>()
const contactMedium = defineModel<ContactMedium>({ required: true })

const currentOption = computed({
  get: () => contactMedium.value['@type'],
  set: (val) => {
    contactMedium.value['@type'] = val
  },
})

const onTypeChange = (e: SelectChangeEvent) =>
  (contactMedium.value = getInitialContactMedium(e.value))
const getInitialContactMedium = (type: ContactMediumType): ContactMedium => {
  switch (type) {
    case ContactMediumType.EmailContactMedium:
      return { '@type': type, contactType: '', emailAddress: '' }
    case ContactMediumType.FaxContactMedium:
      return { '@type': type, contactType: '', faxNumber: '' }
    case ContactMediumType.GeographicAddressContactMedium:
      return {
        '@type': type,
        contactType: '',
        city: '',
        country: '',
        postCode: '',
        stateOrProvince: '',
        street1: '',
        street2: '',
      }
    case ContactMediumType.PhoneContactMedium:
      return { '@type': type, contactType: '', phoneNumber: '' }
    case ContactMediumType.SocialContactMedium:
      return { '@type': type, contactType: '', socialNetworkId: '' }
    default:
      return { '@type': type, contactType: '' }
  }
}
</script>
<template>
  <div class="flex flex-col justify-between">
    <!-- Contact Medium Type Select -->
    <p v-if="readonly" class="text-sm mb-4">{{ currentOption }}</p>
    <Select
      v-else
      v-model="currentOption"
      :options="contactOptions"
      option-label="name"
      option-value="type"
      @change="onTypeChange"
      class="mb-4"
      size="small"
      placeholder="Select a contact medium"
    />

    <!-- Email -->
    <div
      v-if="currentOption == ContactMediumType.EmailContactMedium"
      class="flex flex-col gap-2"
    >
      <label class="text-sm font-medium">Email address</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ (contactMedium as EmailContactMedium).emailAddress }}
      </p>
      <InputText
        v-else
        v-model="(contactMedium as EmailContactMedium).emailAddress"
        type="text"
        size="small"
        placeholder="e.g., user@example.com"
      />
    </div>

    <!-- Fax -->
    <div
      v-if="currentOption == ContactMediumType.FaxContactMedium"
      class="flex flex-col gap-2"
    >
      <label class="text-sm font-medium">Fax number</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ (contactMedium as FaxContactMedium).faxNumber }}
      </p>
      <InputText
        v-else
        v-model="(contactMedium as FaxContactMedium).faxNumber"
        type="text"
        size="small"
        placeholder="e.g., +84 123 4567"
      />
    </div>

    <!-- Geographic Address -->
    <div
      class="grid grid-cols-2 gap-x-4 gap-y-3"
      v-if="currentOption == ContactMediumType.GeographicAddressContactMedium"
    >
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">City</label>

        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ (contactMedium as GeographicAddressContactMedium).city }}
        </p>
        <InputText
          v-else
          v-model="(contactMedium as GeographicAddressContactMedium).city"
          type="text"
          size="small"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Country</label>

        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ (contactMedium as GeographicAddressContactMedium).country }}
        </p>
        <InputText
          v-else
          v-model="(contactMedium as GeographicAddressContactMedium).country"
          type="text"
          size="small"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Postcode</label>

        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ (contactMedium as GeographicAddressContactMedium).postCode }}
        </p>
        <InputText
          v-else
          v-model="(contactMedium as GeographicAddressContactMedium).postCode"
          type="text"
          size="small"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">State or province</label>

        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{
            (contactMedium as GeographicAddressContactMedium).stateOrProvince
          }}
        </p>
        <InputText
          v-else
          v-model="
            (contactMedium as GeographicAddressContactMedium).stateOrProvince
          "
          size="small"
          type="text"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Street 1</label>

        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ (contactMedium as GeographicAddressContactMedium).street1 }}
        </p>
        <InputText
          v-else
          v-model="(contactMedium as GeographicAddressContactMedium).street1"
          type="text"
          size="small"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Street 2</label>

        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ (contactMedium as GeographicAddressContactMedium).street2 }}
        </p>
        <InputText
          v-else
          v-model="(contactMedium as GeographicAddressContactMedium).street2"
          size="small"
          type="text"
        />
      </div>
    </div>

    <!-- Phone -->
    <div
      v-if="currentOption == ContactMediumType.PhoneContactMedium"
      class="flex flex-col gap-2"
    >
      <label class="text-sm font-medium">Phone number</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ (contactMedium as PhoneContactMedium).phoneNumber }}
      </p>
      <InputText
        v-else
        v-model="(contactMedium as PhoneContactMedium).phoneNumber"
        type="text"
        size="small"
        placeholder="e.g., +84 901 234 567"
      />
    </div>

    <!-- SocialContactMedium -->
    <div
      v-if="currentOption == ContactMediumType.SocialContactMedium"
      class="flex flex-col gap-2"
    >
      <label class="text-sm font-medium">Social network id</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ (contactMedium as SocialContactMedium).socialNetworkId }}
      </p>
      <InputText
        v-else
        v-model="(contactMedium as SocialContactMedium).socialNetworkId"
        type="text"
        size="small"
        placeholder="e.g., username_1234"
      />
    </div>
  </div>
</template>

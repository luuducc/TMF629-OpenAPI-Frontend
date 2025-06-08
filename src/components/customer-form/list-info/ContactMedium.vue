<script setup lang="ts">
import { contactMediumMapping, ContactMediumType, contactOptions, type ContactMedium } from '@/types'

import { FormGenerator, FormGroup, FormItem } from '../shared'

const { list: medium } = defineProps<{ list: ContactMedium[] }>()
const onAdd = (): void => {
  medium.push({
    contactType: '',
    preferred: false,
    validFor: {
      startDateTime: new Date(),
      endDateTime: new Date(),
    },
    '@type': ContactMediumType.EmailContactMedium,
  })
}
</script>
<template>
  <FormGenerator main-label="Contact mediums" sub-label="Medium" :on-add="onAdd" :list="medium">
    <template v-slot="{ index }">
      <FormItem label="Preferred" type="checkbox" v-model:check="medium[index].preferred" />
      <div class="grid grid-cols-2 gap-2">
        <FormItem label="Contact type" :id="`medium-value-type-${index}`" v-model:text="medium[index].contactType" />
      </div>
      <FormGroup label="Validity period">
        <FormItem label="Start date" type="date" v-model:date="medium[index].validFor.startDateTime" />
        <FormItem label="End date" type="date" v-model:date="medium[index].validFor.endDateTime" />
      </FormGroup>
      <!-- prettier-ignore -->
      <FormItem label="Medium type" type="select" v-model:select="medium[index]['@type']"
        :select-options="contactOptions" />
      <div v-if="contactMediumMapping[medium[index]['@type']]" class="grid grid-cols-2 gap-2">
        <FormItem
          v-for="value in contactMediumMapping[medium[index]['@type']]"
          :label="value.label"
          :id="`medium-${value.id}-${index}`"
          v-model:text="(medium as any)[index][value.key]"
        />
      </div>
    </template>
  </FormGenerator>
</template>

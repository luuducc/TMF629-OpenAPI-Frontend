<script setup lang="ts">
import { Tag } from 'primevue'

import { contactMediumMapping, type ContactMedium } from '@/types'

import { ItemField, ItemGroup, ItemListField } from '../shared'

defineProps<{ contactMedium: ContactMedium[] }>()
</script>
<template>
  <ItemListField v-if="contactMedium.length > 0" label="Contact mediums">
    <ItemGroup v-for="(item, index) in contactMedium" :key="`med-${index}`" :label="`Medium ${index + 1}`" is-card>
      <!-- Preferred tag -->
      <template #label-extra>
        <Tag class="ml-2" v-if="item.preferred" value="Preferred" rounded icon="pi pi-star-fill" severity="warn" />
      </template>

      <ItemField label="Contact type" :content="item.contactType" />

      <ItemGroup label="Validity period" class="col-span-2">
        <ItemField label="Start date" :content="item.validFor.startDateTime.toLocaleDateString()" />
        <ItemField label="End date" :content="item.validFor.endDateTime.toLocaleDateString()" />
      </ItemGroup>

      <ItemField label="Medium type" :content="item['@type']" />
      <div></div>

      <ItemField
        v-for="(value, index) in contactMediumMapping[item['@type']]"
        :key="`medium-type-${index}`"
        :label="value.label"
        :content="(item as any)[value.key]"
      />
    </ItemGroup>
  </ItemListField>
</template>

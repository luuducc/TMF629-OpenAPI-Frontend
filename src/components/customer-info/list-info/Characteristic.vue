<script setup lang="ts">
import type { Characteristic } from '@/types'

import { ItemField, ItemGroup, ItemListField } from '../shared'

defineProps<{ characteristic: Characteristic[] }>()
</script>
<template>
  <ItemListField v-if="characteristic.length > 0" label="Characteristics">
    <ItemGroup
      v-for="(item, index) in characteristic"
      :key="`charac-${index}`"
      :label="`Characteristic ${index + 1}`"
      is-card
    >
      <ItemField label="Name" :content="item.name" />
      <ItemField label="Value type" :content="item.valueType" />
      <ItemField label="Relationship type" :content="item.characteristicRelationship.relationshipType" />
    </ItemGroup>
  </ItemListField>
</template>

<script setup lang="ts">
import type { RelatedPartyOrPartyRoleRef } from '@/types'

import { ItemField, ItemGroup, ItemListField } from '../shared'

defineProps<{ party: RelatedPartyOrPartyRoleRef[] }>()
</script>
<template>
  <ItemListField v-if="party.length > 0" label="Related parties">
    <ItemGroup v-for="(item, index) in party" :key="`par-${index}`" :label="`Party ${index + 1}`" is-card>
      <ItemField label="Name" :content="item.partyOrPartyRole.name" />
      <ItemField label="Referred type" :content="item.partyOrPartyRole['@referredType']" />
      <ItemField label="Role" :content="item.role" />
    </ItemGroup>
  </ItemListField>
</template>

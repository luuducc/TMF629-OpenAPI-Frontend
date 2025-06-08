<script setup lang="ts">
import type { PartyRoleSpecificationRef } from '@/types'

import { ItemField, ItemGroup } from '../shared'

defineProps<{ partyRoleSpecification: PartyRoleSpecificationRef }>()
</script>
<template>
  <ItemGroup label="Party role specification">
    <ItemField label="Name" :content="partyRoleSpecification.name" />
    <ItemField label="Referred type" :content="partyRoleSpecification['@referredType'] ?? ''" />
  </ItemGroup>
</template>

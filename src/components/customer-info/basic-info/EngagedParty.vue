<script setup lang="ts">
import type { PartyRef } from '@/types'

import { ItemField, ItemGroup } from '../shared'

defineProps<{ engagedParty: PartyRef; role: string }>()
</script>
<template>
  <ItemGroup label="Engaged Party">
    <ItemField label="Name" :content="engagedParty.name" />
    <ItemField label="Referred type" :content="engagedParty['@referredType']" />
    <ItemField label="Role" :content="role" />
  </ItemGroup>
</template>

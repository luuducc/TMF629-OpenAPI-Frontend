<script setup lang="ts">
import type { TimePeriod } from '@/types'

import { ItemField, ItemGroup } from '../shared'

defineProps<{ validFor: TimePeriod }>()
</script>
<template>
  <ItemGroup label="Validity period">
    <ItemField label="Start date" :content="validFor.startDateTime.toLocaleDateString()" />
    <ItemField label="End date" :content="validFor.endDateTime.toLocaleDateString()" />
  </ItemGroup>
</template>

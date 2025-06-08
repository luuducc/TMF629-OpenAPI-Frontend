<script setup lang="ts">
import type { CreditProfile } from '@/types'

import { ItemField, ItemGroup, ItemListField } from '../shared'

defineProps<{ profile: CreditProfile[] }>()
</script>
<template>
  <ItemListField v-if="profile.length > 0" label="Credit profiles">
    <ItemGroup v-for="(item, index) in profile" :key="`profile-${index}`" :label="`Profile ${index + 1}`" is-card>
      <ItemField label="Profile date" :content="item.creditProfileDate.toLocaleDateString()" />
      <div></div>
      <!-- empty column -->
      <ItemField label="Risk rating" :content="item.creditRiskRating.toString()" />
      <ItemField label="Credit score" :content="item.creditScore.toString()" />
      <ItemField label="Start date" :content="item.validFor.startDateTime.toLocaleDateString()" />
      <ItemField label="End date" :content="item.validFor.endDateTime.toLocaleDateString()" />
    </ItemGroup>
  </ItemListField>
</template>

<script setup lang="ts">
import type { AccountRef } from '@/types'

import { ItemField, ItemGroup, ItemListField } from '../shared'

defineProps<{ account: AccountRef[] }>()
</script>
<template>
  <ItemListField v-if="account.length > 0" label="Accounts">
    <ItemGroup v-for="(item, index) in account" :key="`acc-${index}`" :label="`Account ${index + 1}`" is-card>
      <ItemField label="Name" :content="item.name" />
      <ItemField label="Referred type" :content="item['@referredType']" />
    </ItemGroup>
  </ItemListField>
</template>

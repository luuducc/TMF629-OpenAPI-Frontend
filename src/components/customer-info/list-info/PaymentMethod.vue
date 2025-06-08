<script setup lang="ts">
import type { PaymentMethodRef } from '@/types'

import { ItemField, ItemGroup, ItemListField } from '../shared'

defineProps<{ method: PaymentMethodRef[] }>()
</script>
<template>
  <ItemListField v-if="method.length > 0" label="Payment methods">
    <ItemGroup v-for="(item, index) in method" :key="`meth-${index}`" :label="`Method ${index + 1}`" is-card>
      <ItemField label="Name" :content="item.name" />
      <ItemField label="Referred type" :content="item['@referredType']" />
    </ItemGroup>
  </ItemListField>
</template>

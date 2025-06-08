<script setup lang="ts">
import type { AgreementRef } from '@/types'

import { ItemField, ItemGroup, ItemListField } from '../shared'

defineProps<{ agreement: AgreementRef[] }>()
</script>
<template>
  <ItemListField v-if="agreement.length > 0" label="Agreements">
    <ItemGroup v-for="(item, index) in agreement" :key="`agree-${index}`" :label="`Agreement ${index + 1}`" is-card>
      <ItemField label="Name" :content="item.name" />
      <ItemField label="Referred type" :content="item['@referredType']" />
    </ItemGroup>
  </ItemListField>
</template>

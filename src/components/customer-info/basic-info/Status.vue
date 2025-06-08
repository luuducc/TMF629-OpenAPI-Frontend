<script setup lang="ts">
import { getStatusSeverity, StatusType } from '@/types'

import { ItemField, ItemGroup } from '../shared'

defineProps<{
  status: StatusType
  statusReason: string
}>()
</script>
<template>
  <ItemGroup>
    <ItemField label="Status" :content="status" type="tag" :severity="getStatusSeverity(status)" />
    <ItemField label="Status reason" :content="statusReason" />
  </ItemGroup>
</template>

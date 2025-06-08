<script setup lang="ts">
import { Tag } from 'primevue'

import type { PrimeVueSeverity } from '@/types'

const { type = 'text' } = defineProps<{
  label: string
  content: string | undefined
  type?: 'tag'
  severity?: PrimeVueSeverity
}>()
</script>
<template>
  <div class="flex flex-col flex-1">
    <label class="text-sm font-medium">{{ label }}</label>
    <p v-if="type === 'text'">{{ content }}</p>
    <Tag v-if="type === 'tag'" :severity :value="content" rounded style="width: fit-content" />
  </div>
</template>

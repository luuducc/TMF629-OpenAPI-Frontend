<script setup lang="ts">
import { ItemField } from '../shared'

defineProps<{ description: string }>()
</script>
<template>
  <ItemField label="Description" :content="description" />
</template>

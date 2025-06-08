<script setup lang="ts">
import { ItemField, ItemGroup } from '../shared'

defineProps<{
  name: string
  id: string
}>()
</script>
<template>
  <ItemGroup>
    <ItemField label="Name" :content="name" />
    <ItemField label="Id" :content="id" />
  </ItemGroup>
</template>

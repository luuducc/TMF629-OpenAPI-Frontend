<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ title: string; id?: string; mode?: 'view' | 'edit' }>()
</script>
<template>
  <div class="ml-5">
    <p class="text-2xl font-bold text-gray-600">{{ title }}</p>
    <RouterLink to="/customers" class="text-sm text-gray-500 hover:text-gray-700 italic"> Back to Home </RouterLink>
    <RouterLink
      v-if="id && mode === 'view'"
      :to="`/customers/${id}/edit`"
      class="text-sm text-gray-500 hover:text-gray-700 italic"
    >
      | Edit this record
    </RouterLink>
    <RouterLink
      v-if="id && mode === 'edit'"
      :to="`/customers/${id}`"
      class="text-sm text-gray-500 hover:text-gray-700 italic"
    >
      | View this record
    </RouterLink>
  </div>
</template>

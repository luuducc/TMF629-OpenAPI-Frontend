<script setup lang="ts">
import { Textarea } from 'primevue'

const description = defineModel<string>()
defineProps<{ readonly: boolean }>()
</script>
<template>
  <div class="flex flex-col gap-1">
    <label class="font-medium" for="description">Description</label>
    <!-- Render plain text for readonly mode, input field for editing -->
    <p v-if="readonly" class="text-sm">{{ description }}</p>
    <Textarea
      v-else
      v-model="description"
      placeholder="Write something about customer..."
      size="small"
      id="description"
    />
  </div>
</template>

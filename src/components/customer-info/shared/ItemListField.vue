<script setup lang="ts">
defineProps<{ label: string }>()
</script>
<template>
  <div class="rounded-xl shadow-sm p-2 mb-2 border border-gray-200">
    <label class="font-medium">{{ label }}</label>
    <slot />
  </div>
</template>

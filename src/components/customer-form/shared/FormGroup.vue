<script setup lang="ts">
defineProps<{ label?: string }>()
</script>
<template>
  <div class="w-[100%]">
    <label class="text-base font-medium">{{ label }}</label>
    <div class="flex gap-2">
      <slot />
    </div>
  </div>
</template>

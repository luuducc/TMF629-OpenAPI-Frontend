<script setup lang="ts">
const { isCard = false } = defineProps<{ label?: string; isCard?: boolean }>()

const containerClass = isCard ? 'rounded-xl shadow-sm p-2 mb-2 border border-gray-200' : 'py-2'
</script>
<template>
  <div :class="containerClass">
    <label v-if="label" class="font-medium mr-2">{{ label }}</label>
    <slot name="label-extra" />
    <div class="grid grid-cols-2 gap-4">
      <slot />
    </div>
  </div>
</template>

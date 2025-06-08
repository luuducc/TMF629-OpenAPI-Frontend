<script setup lang="ts">
import { ConfirmDialog } from 'primevue'
</script>
<template>
  <ConfirmDialog>
    <template #message="slotProps">
      <div class="mb-4 flex items-center">
        <i :class="slotProps.message.icon" class="!text-3xl text-primary-500 mr-2"></i>
        <span>{{ slotProps.message.message }}</span>
      </div>
    </template>
  </ConfirmDialog>
</template>

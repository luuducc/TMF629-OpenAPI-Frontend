<script setup lang="ts">
import { Button } from 'primevue'

</script>

<template>
  <div class="flex justify-between">
    <!-- View Details Button -->
    <Button
      @click="$emit('view')"
      icon="pi pi-eye"
      label="Detail"
      size="small"
      severity="info"
      outlined
    />

    <!-- Edit Button -->
    <Button
      @click="$emit('update')"
      icon="pi pi-pencil"
      label="Edit"
      size="small"
      severity="warning"
      outlined
    />

    <!-- Delete Button -->
    <Button
      @click="$emit('delete')"
      icon="pi pi-trash"
      label="Delete"
      size="small"
      severity="danger"
      outlined
    />
  </div>
</template>

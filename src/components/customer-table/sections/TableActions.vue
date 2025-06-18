<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'primevue'

defineProps<{ customerId: string }>()
const router = useRouter()
</script>

<template>
  <div class="flex justify-between">
    <!-- View Details Button -->
    <Button
      @click="router.push(`/customers/${customerId}`)"
      icon="pi pi-eye"
      label="Detail"
      size="small"
      severity="info"
      outlined
    />

    <!-- Edit Button -->
    <Button
      @click="router.push(`/customers/${customerId}/edit`)"
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

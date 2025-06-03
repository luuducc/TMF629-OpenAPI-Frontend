<script setup lang="ts">
import {
  Button,
  IconField,
  InputIcon,
  InputText,
  type DataTableFilterMeta,
  type DataTableFilterMetaData,
} from 'primevue'

const filters = defineModel<DataTableFilterMeta>('filters', { required: true })
const emit = defineEmits(['create'])
</script>
<template>
  <div class="flex justify-between">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="(filters.global as DataTableFilterMetaData).value"
        placeholder="Keyword Search"
        size="small"
      />
    </IconField>
    <Button
      @click="emit('create')"
      label="Create new customer"
      icon="pi pi-plus"
      iconPos="left"
      severity="primary"
      size="small"
    />
  </div>
</template>

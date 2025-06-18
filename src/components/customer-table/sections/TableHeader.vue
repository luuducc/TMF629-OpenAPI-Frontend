<script setup lang="ts">
import { IconField, InputIcon, InputText, type DataTableFilterMeta, type DataTableFilterMetaData } from 'primevue'

const filters = defineModel<DataTableFilterMeta>('filters', { required: true })
</script>
<template>
  {{ filters }}
  <IconField>
    <InputIcon class="pi pi-search" />
    <InputText v-model="(filters.global as DataTableFilterMetaData).value" placeholder="Keyword Search" size="small" />
  </IconField>
</template>

<script setup lang="ts">
import {
  Column,
  DataTable,
  InputText,
  Select,
  Tag,
  type DataTableFilterEvent,
  type DataTableFilterMeta,
  type DataTablePageEvent,
  type DataTableSortMeta,
} from 'primevue'

import { getStatusSeverity, partyTypeOptions, statusOptions, type Customer, type PaginationMeta } from '@/types'

import { TableActions, TableHeader } from './sections'

/* Model, Props & Emits */
const loading = defineModel<boolean>('loading')
const filters = defineModel<DataTableFilterMeta>('filters')
const { tableMeta } = defineProps<{ customers: Customer[]; tableMeta: PaginationMeta }>()
const emit = defineEmits<{
  (e: 'delete', id: string, name: string): void
  (e: 'page'): void
  (e: 'filter'): void
  (e: 'sort', meta: DataTableSortMeta[]): void
}>()

/* Event Handlers */
const onPage = (e: DataTablePageEvent) => {
  tableMeta.offset = e.first
  tableMeta.limit = e.rows
  emit('page')
}
const onFilter = async (e: DataTableFilterEvent) => {
  emit('filter')
}
const onSort = async (e: DataTableSortMeta[] | null | undefined) => {
  if (e) {
    emit('sort', e)
  }
}
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="customers"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 40, 50]"
    :loading
    :total-records="tableMeta.total"
    :first="tableMeta.offset"
    @page="onPage"
    @filter="onFilter"
    @update:multi-sort-meta="onSort"
    stripedRows
    paginator
    removable-sort
    sort-mode="multiple"
    filter-display="menu"
    lazy
  >
    <!-- Table Header -->
    <template #header>
      <TableHeader v-model:filters="filters" />
    </template>
    <template #empty> No customers found. </template>

    <!-- Column Index -->
    <Column header="#">
      <template #body="{ index }">
        {{ index + tableMeta.offset + 1 }}
      </template>
    </Column>

    <!-- Column Name -->
    <Column header="Name" field="name" :showFilterMatchModes="false" sortable>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" size="small" placeholder="Search by name" />
      </template>
    </Column>

    <!-- Column Status -->
    <Column header="Status" field="status" :showFilterMatchModes="false" sortable>
      <template #body="{ data }">
        <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
      </template>
      <template #filter="{ filterModel }">
        <Select
          v-model="filterModel.value"
          :options="statusOptions"
          option-label="name"
          option-value="type"
          placeholder="Select One"
          show-clear
          size="small"
        >
          <template #option="slotProps">
            <Tag
              :value="slotProps.option.name"
              :severity="getStatusSeverity(slotProps.option.name)"
              style="height: 1.7rem"
            />
          </template>
        </Select>
      </template>
    </Column>

    <!-- Column Engaged Party -->
    <Column header="Engaged party" field="engagedParty.@referredType" :showFilterMatchModes="false" sortable>
      <template #body="{ data }">
        {{ data.engagedParty['@referredType'] }}
      </template>
      <template #filter="{ filterModel }">
        <Select
          v-model="filterModel.value"
          :options="partyTypeOptions"
          option-label="name"
          option-value="type"
          show-clear
          placeholder="Select One"
          size="small"
        />
      </template>
    </Column>

    <!-- Column Description -->
    <Column header="Description" field="description">
      <template #body="{ data }">
        <span class="truncate-text" v-tooltip="data.description">
          {{ data.description }}
        </span>
      </template>
    </Column>

    <!-- Column Actions -->
    <Column header="Actions">
      <template #body="{ data }">
        <TableActions :customer-id="data.id" @delete="emit('delete', data.id, data.name)" />
      </template>
    </Column>
  </DataTable>
</template>

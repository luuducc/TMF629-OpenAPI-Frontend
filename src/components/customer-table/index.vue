<script setup lang="ts">
import { Column, DataTable, InputText, Select, Tag, type DataTableFilterMeta, type DataTablePageEvent } from 'primevue'

import { FilterMatchMode, FilterOperator } from '@primevue/core/api'

import { ref } from 'vue'

import { getStatusSeverity, partyTypeOptions, statusOptions, type Customer, type PaginationMeta } from '@/types'

import { TableActions, TableHeader } from './sections'

/* Model, Props & Emits */
const loading = defineModel<boolean>('loading')
const { tableMeta } = defineProps<{ customers: Customer[]; tableMeta: PaginationMeta }>()
const emit = defineEmits<{
  (e: 'delete', id: string, name: string): void
  (e: 'page'): void
}>()

/* Reactive states */
const filters = ref<DataTableFilterMeta>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  'engagedParty.@referredType': {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
})

/* Handlers function */
const onPage = (e: DataTablePageEvent) => {
  tableMeta.offset = e.first
  tableMeta.limit = e.rows
  emit('page')
}
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="customers"
    stripedRows
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 20, 40, 50]"
    removable-sort
    sort-mode="multiple"
    filter-display="menu"
    :loading
    @page="onPage"
    lazy
    :total-records="tableMeta.total"
    :first="tableMeta.offset"
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
    <Column header="Name" field="name" sortable>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          @input="filterCallback"
          type="text"
          size="small"
          placeholder="Search by name"
        />
      </template>
    </Column>

    <!-- Column Status -->
    <Column header="Status" field="status" :showFilterMatchModes="false" sortable>
      <template #body="{ data }">
        <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Select
          v-model="filterModel.value"
          @change="filterCallback"
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
      <template #filter="{ filterModel, filterCallback }">
        <Select
          v-model="filterModel.value"
          @change="filterCallback"
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

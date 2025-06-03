<script setup lang="ts">
import {
  Column,
  DataTable,
  InputText,
  Select,
  Tag,
  type DataTableFilterMeta,
} from 'primevue'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'

import { ref } from 'vue'

import {
  getStatusSeverity,
  partyTypeOptions,
  statusOptions,
  type Customer,
} from '@/types'

import CustomerTableActions from './CustomerTableActions.vue'
import CustomerTableHeader from './CustomerTableHeader.vue'

/* Model, Props & Emits */
defineProps<{ customers: Customer[] }>()
const emit = defineEmits<{
  (e: 'create'): void
  (e: 'view', id: string): void
  (e: 'update', id: string): void
  (e: 'delete', id: string, name: string): void
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
  >
    <!-- Table Header -->
    <template #header>
      <CustomerTableHeader @create="emit('create')" v-model:filters="filters" />
    </template>
    <template #empty> No customers found. </template>

    <!-- Column Index -->
    <Column header="#">
      <template #body="{ index }">
        {{ index + 1 }}
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
    <Column
      header="Status"
      field="status"
      :showFilterMatchModes="false"
      sortable
    >
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
    <Column
      header="Engaged party"
      field="engagedParty.@referredType"
      :showFilterMatchModes="false"
      sortable
    >
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
        <CustomerTableActions
          @view="emit('view', data.id)"
          @update="emit('update', data.id)"
          @delete="emit('delete', data.id, data.name)"
        />
      </template>
    </Column>
  </DataTable>
</template>

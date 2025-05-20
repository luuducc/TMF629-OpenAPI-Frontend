<script setup lang="ts">
import {
  Button,
  Column,
  DataTable,
  Divider,
  IconField,
  InputIcon,
  InputText,
  Tag, 
  Toast,
  ConfirmDialog,
  useToast,
  useConfirm
} from 'primevue'
import CustomerFormDialog from '@/components/dialog/CustomerFormDialog.vue'
import { CustomerFormMode } from '@/types'
import type { Customer } from '@/types'
import { ref, onMounted, watch } from 'vue'
import products from '@/mockdata/data.js'
import { CustomerService } from '@/services/customerService'
import { getSeverity } from '@/utils/status-utils'
import axios from 'axios'
import { FilterMatchMode } from '@primevue/core/api'

const toast = useToast()
const confirm = useConfirm()
const showDialog = ref<boolean>(false)
const mode = ref<CustomerFormMode>(CustomerFormMode.Create)
const customers = defineModel<Customer[]>()
const defaultCustomer: Customer = {
  // Basic info
  '@type': 'Customer',
  id: '',
  name: '',
  role: '',
  description: '',
  status: undefined,
  statusReason: '',

  // Validity period
  validFor: {
    startDateTime: new Date(),
    endDateTime: new Date()
  },

  // Engaged party
  engagedParty: {
    name: '',
    '@referredType': undefined
  },
  partyRoleSpecification: {
    name: '',
    '@referredType': undefined
  },

  // Associated entities
  account: [],
  agreement: [],
  characteristic: [],
  contactMedium: [],
  creditProfile: [],
  paymentMethod: [],
  relatedParty: []
}
const customer = ref<Customer>()
const isUpdateSuccess = ref<boolean>(false)
const customerIndex = ref<number>(-1)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

watch(isUpdateSuccess, () => {
  if (isUpdateSuccess.value && customers.value && customer.value) {
    customers.value[customerIndex.value] = customer.value
    isUpdateSuccess.value = false
  }
})
const handleDetails = (data: Customer) => {
  customer.value = { ...defaultCustomer, ...data}
  mode.value = CustomerFormMode.View
  showDialog.value = true
  console.log('detail')
}
const handleUpdate = (data: Customer, rowIndex: number) => {
  customer.value = { ...defaultCustomer, ...data}
  customerIndex.value = rowIndex
  mode.value = CustomerFormMode.Update
  showDialog.value = true
  console.log('update')
}
const handleDelete = (rowIndex: number) => {
  if (customers.value) {
    const customerToDelete = customers.value[rowIndex]
    const deleteId = customerToDelete.id
    const displayName = customerToDelete.name
    confirm.require({
      message: `Do you want to delete ${displayName}?`,
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptProps: {
          label: 'Delete',
          severity: 'danger'
      },
      accept: async () => {
          try {
            await CustomerService.deleteCustomer(deleteId)

            // remove deleted customer from array data
            if (customers.value) {
              customers.value = customers.value.filter(el => el.id !== deleteId)
            }
            toast.add({ severity: 'info', summary: 'Confirmed', detail: `Deleted ${displayName}`, life: 3000 });
          } catch (err) {
            if (axios.isAxiosError(err)) {
              const errData = err.response?.data
              toast.add({ severity: 'error', summary: 'Delete failed', detail: errData?.message || 'Something went wrong.', life: 3000 });
              return
            }
            toast.add({ severity: 'error', summary: 'Delete failed', detail: 'An unexpected error occurred.', life: 3000 });
          }
      },
      reject: () => {
          toast.add({ severity: 'error', summary: 'Rejected', detail: `Delete cancelled for ${displayName}`, life: 3000 });
      }
    })
  }
}
</script>

<template>
  <Toast/>
  <ConfirmDialog/>
  <CustomerFormDialog 
    :mode 
    v-model:customer="customer" 
    v-model:isUpdateSuccess="isUpdateSuccess"
    v-model:visible="showDialog" 
  />
  <section>
    <DataTable 
      v-model:filters="filters"
      :global-filter-fields="['name', 'status']"
      :value="customers" 
      tableStyle="min-width: 50rem" 
      stripedRows
      paginator 
      :rows="20" 
      :rowsPerPageOptions="[20, 30, 40, 50]"
      removableSort
      sortMode="multiple"
    >
      <template #header>
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText v-model="filters.global.value" placeholder="Search customer" size="small" />
        </IconField>
      </template>
      <Column header="#" style="width: 10%">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column header="Name" field="name" sortable style="width: 15%"></Column>
      <Column header="Status" field="status" sortable style="width: 10%">
        <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
      </Column>
      <Column header="Description" field="description" style="width: 40%"></Column>
      <Column header="Actions" class="w-70">
        <template #body="{ data, index }">
          <div class="flex justify-between">
            <!-- View Details Button -->
            <Button 
              icon="pi pi-eye"
              label="Detail"
              size="small"
              severity="info"
              outlined
              @click="handleDetails(data)"
            />

            <!-- Edit Button -->
            <Button 
              icon="pi pi-pencil"
              label="Edit"
              size="small"
              severity="warning"
              outlined
              @click="handleUpdate(data, index)"
            />

            <!-- Delete Button -->
            <Button 
              icon="pi pi-trash"
              label="Delete"
              size="small"
              severity="danger"
              outlined
              @click="handleDelete(index)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </section>
  <Divider />
</template>
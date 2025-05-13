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
import { CustomerFormMode, StatusType, statusMap } from '@/types'
import type { PrimeVueSeverity } from '@/types'
import { ref } from 'vue'
import products from '@/mockdata/data.js'

const toast = useToast()
const confirm = useConfirm()
const showDialog = ref<boolean>(false)
const mode = ref<CustomerFormMode>(CustomerFormMode.Create)

const handleDetails = () => {
  mode.value = CustomerFormMode.View
  showDialog.value = true
  console.log('detail')
}
const handleUpdate = () => {
  mode.value = CustomerFormMode.Update
  showDialog.value = true
  console.log('update')
}
const handleDelete = () => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
    },
    acceptProps: {
        label: 'Delete',
        severity: 'danger'
    },
    accept: () => {
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    },
    reject: () => {
        toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  })
  console.log('delete')
}
const getSeverity = (status: StatusType): PrimeVueSeverity => {
  switch (status) {
    case StatusType.Draft:
    case StatusType.Inactive:
    case StatusType.Archived:
      return 'secondary';

    case StatusType.Created:
    case StatusType.Pending:
      return 'info';

    case StatusType.Verified:
    case StatusType.Active:
      return 'success';

    case StatusType.Suspended:
      return 'warn';

    case StatusType.Blacklisted:
    case StatusType.Rejected:
    case StatusType.Deleted:
      return 'danger';

    default:
      return 'secondary'; // fallback
  }
}

</script>

<template>
  <Toast/>
  <ConfirmDialog/>
  <section class="flex mb-4">
      <CustomerFormDialog :mode v-model:visible="showDialog" />
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search customer" />
      </IconField>
    </section>
    <Divider />
    <section>
      <DataTable 
        :value="products" 
        tableStyle="min-width: 50rem" 
        showGridlines 
        stripedRows
        paginator 
        :rows="5" 
        :rowsPerPageOptions="[5, 10, 15, 20]"
        removableSort 
      >
        <Column header="#" style="width: 10%">
          <template #body="{ index }">
            {{ index + 1 }}
          </template>
        </Column>
        <Column header="Name" field="name" sortable style="width: 15%"></Column>
        <Column header="Status" field="status" sortable style="width: 10%">
          <template #body="{ data }">
              <Tag :value="statusMap[data.status as StatusType]" :severity="getSeverity(data.status)" />
          </template>
        </Column>
        <Column header="Description" field="description" style="width: 40%"></Column>
        <Column header="Actions" class="w-70">
          <template #body>
            <div class="flex justify-between">
              <!-- View Details Button -->
              <Button 
                icon="pi pi-eye"
                label="Detail"
                size="small"
                severity="info"
                outlined
                @click="handleDetails"
              />

              <!-- Edit Button -->
              <Button 
                icon="pi pi-pencil"
                label="Edit"
                size="small"
                severity="warning"
                outlined
                @click="handleUpdate"
              />

              <!-- Delete Button -->
              <Button 
                icon="pi pi-trash"
                label="Delete"
                size="small"
                severity="danger"
                outlined
                @click="handleDelete"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </section>
    <Divider />
</template>
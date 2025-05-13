<script setup lang="ts">
import {
  Button,
  Column,
  DataTable,
  Divider,
  IconField,
  InputIcon,
  InputText
} from 'primevue'
import CustomerFormDialog from '@/components/dialog/CustomerFormDialog.vue'
import { CustomerFormMode } from '@/types'
import { ref } from 'vue'
import products from '@/mockdata/data.js'


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
  console.log('delete')
}
</script>

<template>
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
        :rowsPerPageOptions="[5, 10, 15, 20]">
        <Column header="#">
          <template #body="{ index }">
            {{ index + 1 }}
          </template>
        </Column>
        <Column field="code" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Status"></Column>
        <Column field="quantity" header="Description"></Column>
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
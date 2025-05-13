<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Divider from 'primevue/divider'
import { ref } from "vue"
import products from './mockdata/data.js'
import CustomerFormDialog from './components/CustomerFormDialog.vue'

const showDialog = ref(false)
const createCustomer = () => {
  showDialog.value = true
}
const handleDetails = () => {
  console.log('detail')
}
const handleUpdate = () => {
  console.log('update')
}
const handleDelete = () => {
  console.log('delete')
}
</script>
<template>
  <div class="flex justify-between items-center px-4 pt-3">
    <header class="text-xl">
      TMF 629 API
    </header>
    <Button label="Create new customer" @click="createCustomer"/>
  </div>
  <div class="main-content px-8">
    <section class="flex mb-4">
      <CustomerFormDialog v-model:visible="showDialog" />
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search customer" />
      </IconField>
    </section>
    <Divider />
    <section>
      <DataTable :value="products" tableStyle="min-width: 50rem" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 15, 20]">
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
  </div>
</template>
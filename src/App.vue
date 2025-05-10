<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Divider from 'primevue/divider'
import Menu from 'primevue/menu'
import { ref } from "vue"
import products from './mockdata/data.js'
import CustomerDialog from './components/CustomerDialog.vue'

const showDialog = ref(false)
const menu = ref()
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
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Details',
                icon: 'pi pi-external-link',
                command: handleDetails
            },
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                command: handleUpdate
            }, 
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: handleDelete
            }, 
        ]
    }
])
const toggle = (event) => {
    menu.value.toggle(event)
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
      <CustomerDialog v-model:visible="showDialog" />
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search customer" />
      </IconField>
    </section>
    <Divider />
    <section>
      <DataTable :value="products" tableStyle="min-width: 50rem" showGridlines paginator :rows="10" :rowsPerPageOptions="[5, 10, 15, 20]">
        <Column header="#">
          <template #body="{ index }">
            {{ index + 1 }}
          </template>
        </Column>
        <Column field="code" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Status"></Column>
        <Column field="quantity" header="Description"></Column>
        <Column>
          <template #body>
            <Button type="button" icon="pi pi-ellipsis-h" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="p-button-text" />
            <Menu ref="menu" :model="items" :popup="true" />
          </template>
        </Column>
      </DataTable>
    </section>
    <Divider />
  </div>
</template>
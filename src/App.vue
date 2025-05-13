<script setup lang="ts">
import { Button } from 'primevue'
import { ref } from "vue"
import CustomerFormDialog from './components/dialog/CustomerFormDialog.vue'
import { CustomerFormMode } from '@/types'
import CustomerTable from '@/components/table/CustomerTable.vue'

const showDialog = ref<boolean>(false)
const mode = ref<CustomerFormMode>(CustomerFormMode.Create)
const createCustomer = () => {
  mode.value = CustomerFormMode.Create
  showDialog.value = true
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
    <CustomerTable/>
  </div>
  <CustomerFormDialog :mode v-model:visible="showDialog" />
</template>